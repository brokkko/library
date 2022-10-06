import express from 'express';
import passport from 'passport';
import BookStorage from "./storage/BookStorage.js";
import path from "path";

const router = express.Router();
const __dirname = path.resolve();
let bookStorage = new BookStorage();

router.get('/', checkAuthenticated, (req, res) => {
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

router.get('/library/:id', (req, res) => {
    res.render('bookPage.ejs', {book: bookStorage.getById(req.params.id)})
})

router.put('/library/:id', (req, res) => {
    let mapData = new Map(Object.entries(req.body));
    mapData.forEach((value, key) => {
        console.log(key, value);
        bookStorage.updateBook(req.params.id, key, value);
    })
    res.render('bookPage.ejs', {book: bookStorage.getById(req.params.id)})
});

router.delete('/library/:id', (req, res) => {
    bookStorage.deleteById(req.params.id);
    res.sendStatus(200);
})

export default router;
