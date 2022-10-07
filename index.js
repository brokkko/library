import express from 'express';
const app = express();
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import methodOverride from 'method-override';
import userPassport from './passport/passport-config.js';
import fs from 'fs';
import path from 'path';
import router from "./routes.js";

userPassport.initialize(
    passport,
    email => admin,
    id => admin
)

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));
let admin = loadJSON('./passport/admin.json');

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'views')))
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'));

app.use(express.json({
    type: ['application/json', 'text/plain']
}))

app.use('/', router);


app.listen(3000)