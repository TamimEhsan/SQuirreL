// libraries
const express = require('express');
const DB_cart = require('../../Database/DB-cart-api');
const DB_Order = require('../../Database/DB-order-api');
// creating router
const router = express.Router({mergeParams : true});



router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const userId = req.user.id;


    let status = 0
    if(req.query.orderStatus )
        status = req.query.orderStatus;
    let orderItems;

    if( status == 0 || status>7 )
        orderItems = await DB_Order.getAllOrderByUserId(userId);
    else
        orderItems = await DB_Order.getAllOrderByStatus(userId,status);

    res.render('layout.ejs', {
        user:req.user,
        body:['ordersPage'],
        title:'Orders',
        navbar:-1,
        _status: status,
        items:orderItems
    });
});

router.get('/track/:id', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const userId = req.user.id;
    // console.log(userId,req.params);
    const orderItems = await DB_Order.getOrderById(userId,req.params.id);


    const books = await DB_cart.getItemsInCartByCartId(userId,orderItems[0].CART_ID);

    res.render('layout.ejs', {
        user:req.user,
        body:['orderPage'],
        title:'Orders',
        navbar:-1,
        items:orderItems[0],
        books:books
    });
});

router.get('/delete/:bookID', async (req,res) =>{
    await DB_cart.deleteItemFromCart(req.user.id,req.params.bookID);
    console.log(req.user.id,req.params.bookID);
    return res.redirect('/cart');
});




module.exports = router;