// libraries
const express = require('express');
// creating router
const router = express.Router({mergeParams : true});

const DB_order = require('../../../Database/DB-order-api');

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