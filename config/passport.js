import { compareSync } from 'bcrypt';
import passport from 'passport';
import { Strategy } from "passport-local";
import { UserModel } from './database.js';

passport.use(new Strategy(
    function (username, password, done) {
        UserModel.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); } //When some error occurs

            if (!user) {  //When username is invalid
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!compareSync(password, user.password)) { //When password is invalid
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user); //When user is valid
        });
    }
));

//Persists user data inside session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(function (id, done) {
    UserModel.findById(id, function (err, user) {
        done(err, user);
    });
});