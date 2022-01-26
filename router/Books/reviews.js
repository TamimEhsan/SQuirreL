// libraries
const express = require('express');

const DB_review = require('../../Database/DB-review-api');
// creating router
const router = express.Router({mergeParams : true});

router.post('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }

    let hasOrdered = await DB_review.hasBookOrdered(req.user.id,req.body.bookId);
    let hasReviewd = await DB_review.hasReviewdBook(req.user.id,req.body.bookId);

    if( !hasOrdered || hasReviewd ) return res.redirect('/books');
    await DB_review.insertReview(req.user.id,req.body.bookId,req.body.rating,req.body.review);
    return res.redirect('/books/'+req.body.bookId);
    // res.render('layout.ejs', {
    //     user:req.user,
    //     body:['allBooksPage'],
    //     title:'Books',
    //     navbar:1,
    //     books:booksResult
    // });
});



module.exports = router;