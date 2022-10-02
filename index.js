import express from 'express';
const app = express();
import bcrypt from 'bcrypt';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import userPassport from './passport/passport-config.js';
import fs from 'fs';

userPassport.initialize(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
const usersFromDB = loadJSON('./passport/database.json');
let users = []
for(let i in usersFromDB)
    users.push(usersFromDB[i]);

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: "hihihi",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        let id = Date.now().toString();
        users.push({
            id: id,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        // ------------- json -----------------
        const jsonContent = JSON.stringify(users);
        fs.writeFile("./passport/database.json", jsonContent, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
        // ------------------------------------

        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3000)