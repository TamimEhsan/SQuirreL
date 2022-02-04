// libraries
const express = require('express');

const DB_wish = require('../../Database/DB-wishlist-api');
// creating router
const router = express.Router({mergeParams : true});

router.get('/toggle/:bookId', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    let user_id = req.user.id;
    let book_id = req.params.bookId;
    let hasAdded = await DB_wish.hasAdded(user_id,book_id);


    if( hasAdded )  await DB_wish.removeFromList(user_id,book_id);
    else await DB_wish.addToWishlist(user_id,book_id);
    return res.redirect('/books/'+book_id);

    return res.redirect('/books/'+req.body.bookId);
});



module.exports = router;