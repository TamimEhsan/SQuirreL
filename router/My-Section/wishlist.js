// libraries
const express = require('express');
const DB_wish = require('../../Database/DB-wishlist-api');

// creating router
const router = express.Router({mergeParams : true});



router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const userId = req.user.id;
    const wishResult = await DB_wish.getAllByUser(userId);
    // console.log(wishResult);
    res.render('layout.ejs', {
        user:req.user,
        body:['wishlist'],
        title:'Profile',
        navbar:-1,
        wishList:wishResult

    });
});

router.get('/remove/:bookId', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    let user_id = req.user.id;
    let book_id = req.params.bookId;

    await DB_wish.removeFromList(user_id,book_id);

    return res.redirect('/my-section/wishlist/');

    return res.redirect('/books/'+req.body.bookId);
});



module.exports = router;