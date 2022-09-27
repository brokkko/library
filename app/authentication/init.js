import * as passport from 'passport';
import { Strategy } from "passport-local";
import * as bcrypt from 'bcrypt';
import * as authenticationMiddleware from './middleware.js'

// Generate Password with salt
const saltRounds = 10;
const realPassword = 'real-password';
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(realPassword, salt);

const user = {
    username: 'test-user',
    passwordHash,
    id: 1
};

passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});
passport.deserializeUser(function (username, cb) {
    findUser(username, cb);
});

function findUser (username, callback) {
    if (username === user.username) {
        return callback(null, user)
    }
    return callback(null)
}

function initPassport () {
    passport.use(new Strategy(
        (username, password, done) => {
            findUser(username, (err, user) => {
                if (err) {
                    return done(err);
                }

                // User not found
                if (!user) {
                    console.log('User not found');
                    return done(null, false);
                }

                // Always use hashed passwords and fixed time comparison
                bcrypt.compare(password, user.passwordHash, (err, isValid) => {
                    if (err) {
                        return done(err);
                    }
                    if (!isValid) {
                        return done(null, false);
                    }
                    return done(null, user);
                })
            })
        }
    ))

    passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;