// libraries
const express = require('express');
const DB_book = require('../../Database/DB-book-api');
const DB_review = require('../../Database/DB-review-api');

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
    const canReview = await DB_review.hasBookOrdered(req.user.id,req.params.bookID);
    let hasReviewd = await DB_review.hasReviewdBook(req.user.id,req.params.bookID);
    let reviews = await DB_review.getAllReviewsByBook(req.params.bookID);
    res.render('layout.ejs', {
        user:req.user,
        body:['bookPage'],
        title:'Books',
        navbar:1,
        book:booksResult[0],
        reviews:reviews,
        canReview:canReview,
        hasReviewd:hasReviewd
    });
});

module.exports = router;