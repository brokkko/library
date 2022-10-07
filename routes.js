import express from 'express';
import passport from 'passport';
import BookStorage from "./storage/BookStorage.js";

const router = express.Router();
let bookStorage = new BookStorage();
let regularCheck = /^[a-zA-Zа-яА-Я]*\s(([a-zA-Zа-яА-Я]*)|([a-zA-Zа-яА-Я]\.))\s(([a-zA-Zа-яА-Я]*)|([a-zA-Zа-яА-Я]\.))$/u;
let regularCheckDate = /^\d{4}[-](0?[1-9]|1[012])[-](0?[1-9]|[12][0-9]|3[01])$/;

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

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        res.redirect('/login');
    });
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

router.post('/library', checkAuthenticated, (req, res) => {
    if( regularCheck.test(req.body.author) && req.body.title && regularCheckDate.test(req.body.release) ) {
        bookStorage.addBook(req.body.author, req.body.title, req.body.release);
    }
    res.redirect('/');
});

router.get('/library/:id', checkAuthenticated, (req, res) => {
    res.render('bookPage.ejs', {book: bookStorage.getById(req.params.id)})
})

router.put('/library/:id', checkAuthenticated, (req, res) => {
    let mapData = new Map(Object.entries(req.body));
    mapData.forEach((value, key) => {
        bookStorage.updateBook(req.params.id, key, value);
    })
    res.render('bookPage.ejs', {book: bookStorage.getById(req.params.id)})
});

router.delete('/library/:id', checkAuthenticated, (req, res) => {
    bookStorage.deleteById(req.params.id);
    res.sendStatus(200);
})

router.get('/library/sort/overdue', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {books: bookStorage.getAllOverdue()})
})

router.get('/library/sort/instock', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {books: bookStorage.getAllInStock()})
})

router.get('/library/sort/given', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {books: bookStorage.getAllSortedByReturnDate()})
})

export default router;
