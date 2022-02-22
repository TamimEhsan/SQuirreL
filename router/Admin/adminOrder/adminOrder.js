// libraries
const express = require('express');
// creating router
const router = express.Router({mergeParams : true});

const DB_order = require('../../../Database/DB-order-api');
const DB_cart = require('../../../Database/DB-cart-api');

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const orderResult = await DB_order.getAllUncompleteOrder();
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminOrderAll',
        orders:orderResult
    });
});
router.get('/:id', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    console.log('aaaaaaaaaaa')
    const orderItems = await DB_order.getOrderByIdAdmin(req.params.id);
    console.log(orderItems);

    const books = await DB_cart.getItemsInCartByCartIdAdmin(orderItems[0].CART_ID);
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminOrderShow',
        items:orderItems[0],
        books:books
    });
});
router.post('/update', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    console.log(req.body);
    const {orderId,orderStatus} = req.body;
    await DB_order.updateOrderState(orderId,orderStatus);
    return res.redirect('/admin/order');
});
module.exports = router;