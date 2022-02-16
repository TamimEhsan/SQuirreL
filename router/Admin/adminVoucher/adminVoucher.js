// libraries
const express = require('express');
// creating router
const router = express.Router({mergeParams : true});

const DB_voucher = require('../../../Database/DB-voucher-api');
const DB_publisher = require('../../../Database/DB-publisher');

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const booksResult = await DB_voucher.getAllVoucher();
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminVoucherAll',
        vouchers:booksResult
    });
});


router.get('/edit/:id', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const voucherResult = await DB_voucher.getVoucherById(req.params.id);
    if( voucherResult.length === 0 ) return res.redirect('/admin/voucher');
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminVoucherEdit',
        voucher:voucherResult[0]
    });
});
router.get('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');

    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminVoucherAdd',

    });
});
router.post('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    console.log(req.body);
    // return res.redirect('/admin/voucher');
    const {name,discount,cap,validity} = req.body;
    await DB_voucher.createVoucher(name,discount,validity,cap);
    return res.redirect('/admin/voucher');

});

router.post('/edit', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const {id,name,discount,cap,validity} = req.body;
    await DB_voucher.updateVoucher(id,name,discount,validity,cap);
    return res.redirect('/admin/voucher');

});


module.exports = router;