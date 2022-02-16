// libraries
const express = require('express');

const DB_review = require('../../Database/DB-review-api');
// creating router
const router = express.Router({mergeParams : true});

router.post('/', async (req, res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
    await DB_review.insertReview(req.user.id,req.body.bookId,req.body.rating,req.body.review);
    return res.redirect('/books/'+req.body.bookId);
});



module.exports = router;