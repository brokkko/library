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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session())


app.post('/library', (req, res) => {
    console.log("post")

    res.send({ success: true })

})

app.listen(PORT, () => {
    console.log("Server started")
});


