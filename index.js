import express from 'express';
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import {hashSync} from "bcrypt";
import bodyParser from 'body-parser';


const __dirname = path.resolve();
const PORT = 3000;
const app = express();

app.use(express.static(__dirname + '/routes'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));



passport.use(new LocalStrategy(
    async function (username, password, done) {
        console.log("in local strategy")
        let usersArray = await db.select("User");
        let user = usersArray.find((elem) => elem.username === username && elem.password === password);
        console.log(user.username, user.password);
        if(!user) {
            console.log("Error: user doesn't exist")
            return done(null, false);
        }
        console.log("Done: user exists")
        return done(null, user);
    }
));

app.post('/signin', async (req, res) => {
    console.log("post")
    // Create a new person with a random id
    let created = await db.create("User", {
        username: req.body.username,
        password: req.body.password,
        marketing: true,
        identifier: Math.random().toString(36).substr(2, 10),
    });
    console.log("created")
    // res.send({ success: true })
    res.redirect("/library.html");

})

app.post('/signup', passport.authenticate('local', {
    successRedirect: '/library.html',
    failureRedirect: '/',
    session: false
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    let usersArray = await db.select("User");
    let user = usersArray.find((elem) => elem.id === id);
    if(user) done(null, user)
});

app.listen(PORT, () => {
    console.log("Server started")
});


