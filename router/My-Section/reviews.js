// libraries
const express = require('express');
const DB_review = require('../../Database/DB-review-api');

// creating router
const router = express.Router({mergeParams : true});



router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const userId = req.user.id;
    const reviewResult = await DB_review.getAllReviewsByUser(userId);
    const unreviewResult = await DB_review.getAllUnreviewedBooksByUser(userId);
    res.render('layout.ejs', {
        user:req.user,
        body:['myreviews'],
        title:'Profile',
        navbar:-1,
        books: reviewResult,
        unreviewdBooks:unreviewResult
    });
});

router.post('/edit', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const{reviewId,bookId,review,rating} = req.body;
    await DB_review.editReview(req.user.id,bookId,reviewId,rating,review);
    return res.redirect('/my-section/reviews');
    // res.render('layout.ejs', {
    //     user:req.user,
    //     body:['allBooksPage'],
    //     title:'Books',
    //     navbar:1,
    //     books:booksResult
    // });
});



module.exports = router;