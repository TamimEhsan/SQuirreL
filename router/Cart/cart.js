// libraries
const express = require('express');
const DB_cart = require('../../Database/DB-cart-api');
const DB_Order = require('../../Database/DB-order-api');
const DB_voucher = require('../../Database/DB-voucher-api');
// creating router
const router = express.Router({mergeParams : true});


router.post('/update', async (req,res) =>{
    let items = req.body.items;
    items = JSON.parse(items);
    for(let i = 0;i<items.length;i++){
        await DB_cart.updateAmount(items[i].ID,items[i].AMOUNT);
    }
    return res.sendStatus(200);
});
router.post('/confirmOrder', async (req,res) =>{
    const userId = req.user.id;
    const {voucherId,name,phone,phone2,address,pick} = req.body;
    await DB_Order.createOrderFromCart(userId,voucherId,name,phone,phone2,address,pick);  //cartId,voucherId,total_price,total_item,name,phone1,phone2,address,pick
    return res.redirect('/my-section/orders');
});
router.post('/:bookID', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }

    const bookID = req.params.bookID;
    // console.log("hrnlo   ",bookID,req.user.id);

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
    // console.log(cartItems[0]);
    res.render('layout.ejs', {
        user:req.user,
        body:['cartPage'],
        title:'Cart',
        navbar:-1,
        items:cartItems
    });
});


router.get('/delete/:bookID', async (req,res) =>{
    await DB_cart.deleteItemFromCart(req.user.id,req.params.bookID);
    console.log(req.user.id,req.params.bookID);
    return res.redirect('/cart');
});

router.get('/voucher/:voucherName', async (req,res) =>{
    const voucherResult = await DB_voucher.getVoucherByName(req.params.voucherName);
    if( voucherResult.length === 0 ) return res.sendStatus(404);
    return res.status(200).send({voucherId:voucherResult[0].ID,discount:voucherResult[0].DISCOUNT,cap:voucherResult[0].CAP});
});

router.get('/ship', async (req,res) =>{
    if(req.user === null){
        return res.redirect('/login');
    }
    const userId = req.user.id;
    const cartIdResult = await DB_cart.getAssignedCart(userId)
    const cartId = cartIdResult[0].CART_ID;
    const priceResult = await DB_cart.getTotalPrice(cartId);
    console.log('hello there general kenobi',priceResult[0]);
    if( !priceResult[0].PRICE ){
        // do something
        return res.redirect('/');
    }
    // await DB_Order.createOrderFromCart(cartId);
    // await DB_cart.addNewCart(userId);
    console.log(priceResult[0].PRICE)
    return  res.render('layout.ejs', {
        user:req.user,
        body:['placeOrder'],
        title:'Cart',
        navbar:-1,
        cart:{
            cartId:cartId,
            price:priceResult[0].PRICE
        }
    });
});

module.exports = router;