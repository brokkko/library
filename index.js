import express from 'express';
const app = express();
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import userPassport from './passport/passport-config.js';
import fs from 'fs';
import BookStorage from "./storage/BookStorage.js";

console.log("Start")

userPassport.initialize(
    passport,
    email => admin,
    id => admin
)

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
let admin = loadJSON('./passport/admin.json');
let bookStorage = new BookStorage();

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: "hihihi",
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    console.log(req.session)
    res.render('index.ejs', { books: bookStorage.books })
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
    if (req.session.passport) {
        return next();
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.post('/library', (req, res) => {
    if( req.body.author && req.body.title && req.body.release ) {
        bookStorage.addBook(req.body.author, req.body.title, req.body.release);
    }
    res.redirect('/')
});



app.listen(3000)