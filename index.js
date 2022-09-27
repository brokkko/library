import express from 'express';
import path from 'path';
// import session from 'express-session';
// import passport from 'passport';
// import cookieParser from 'cookie-parser';
// import MongoStore from 'connect-mongo';
import { UserModel } from './config/database.js';
import {hashSync} from "bcrypt";
import bodyParser from 'body-parser';


// const MongoStore = connectMongo(session);
const __dirname = path.resolve();
const PORT = 3000;
const app = express();

app.use(express.static(__dirname + '/routes'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/library', (req, res) => {
    console.log("post")
    let user = new UserModel({
        username: req.body.username,
        password: hashSync(req.body.password, 10)
    })

    user.save().then(user => console.log(user));

    res.send({ success: true })

})


//
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/passport', collectionName: "sessions" }),
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }))
//
// // require('./config/passport');
//
// app.use(passport.initialize())
// app.use(passport.session())
//
// app.post('/library', (req, res) => {
//     console.log("here")
//     let user = new UserModel({
//         username: req.body.username,
//         password: hashSync(req.body.password, 10)
//     })
//
//     user.save().then(user => console.log(user));
//
//     res.send({ success: true })
// })
//

// // need cookieParser middleware before we can do anything with cookies
// app.use(cookieParser("secret code"));
//
// // set a cookie
// app.use(function (req, res, next) {
//     // check if client sent cookie
//     let cookie = req.cookies.cookie;
//     if (cookie === undefined) {
//         // no: set a new cookie
//         let randomNumber=Math.random().toString();
//         randomNumber=randomNumber.substring(2,randomNumber.length);
//         res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
//         console.log('cookie created successfully');
//     } else {
//         // yes, cookie was already present
//         console.log('cookie exists', cookie);
//     }
//     next(); // <-- important!
// });
//
// app.use(session({
//
// }))
//
// app.use(express.static(__dirname + '/routes'));
//
//
//
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'routes', 'index.html'));
// })
//
//
app.listen(PORT, () => {
    console.log("Server started")
});


