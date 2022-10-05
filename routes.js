import express from 'express';
import passport from 'passport';
import BookStorage from "./storage/BookStorage.js";

const router = express.Router();

let bookStorage = new BookStorage();

router.get('/', checkAuthenticated, (req, res) => {
    console.log(req.session)
    res.render('index.ejs', { books: bookStorage.books })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

router.delete('/logout', (req, res) => {
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

router.post('/library', (req, res) => {
    if( req.body.author && req.body.title && req.body.release ) {
        bookStorage.addBook(req.body.author, req.body.title, req.body.release);
    }
    res.redirect('/')
});

router.delete('/library/:id', (req, res) => {
    console.log("IN INDEX")
    console.log(req.params.id)
    bookStorage.deleteById(req.params.id);
    res.sendStatus(200);
})

export default router;
