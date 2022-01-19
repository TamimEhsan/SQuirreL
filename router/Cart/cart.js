// libraries
const express = require('express');
const DB_cart = require('../../Database/DB-cart-api');
// creating router
const router = express.Router({mergeParams : true});

router.post('/:bookID', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }

    const bookID = req.params.bookID;
    console.log("hrnlo   ",bookID,req.user.id);

    const checkBook = await DB_cart.checkCart(req.user.id,bookID);
    if( checkBook.length === 0 ) {
        await DB_cart.addToCart(req.user.id,bookID);
        return res.sendStatus(200);
    }else{
        return res.sendStatus(204);
    }

});




router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const cartItems = await DB_cart.getItemsInCart(req.user.id);
    res.render('layout.ejs', {
        user:req.user,
        body:['cartPage'],
        title:'Cart',
        navbar:-1,
        items:cartItems
    });
});


module.exports = router;