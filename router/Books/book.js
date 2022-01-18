// libraries
const express = require('express');
const DB_book = require('../../Database/DB-book-api');

// creating router
const router = express.Router({mergeParams : true});

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const booksResult = await DB_book.getAllBooks();
    res.render('layout.ejs', {
        user:req.user,
        body:['allBooksPage'],
        title:'Books',
        navbar:1,
        books:booksResult
    });
});

router.get('/:bookID', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const booksResult = await DB_book.getBookByID(req.params.bookID);
    if( booksResult.length === 0 )
        return res.redirect('/');
    res.render('layout.ejs', {
        user:req.user,
        body:['bookPage'],
        title:'Books',
        navbar:1,
        book:booksResult[0]
    });
});

module.exports = router;