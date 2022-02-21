// libraries
const express = require('express');
// creating router
const router = express.Router({mergeParams : true});

const DB_restock = require('../../../Database/DB-stock-api');

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');

    let limits = 50;
    let offsetPage = 1;
    if( req.query.page ) offsetPage = req.query.page;
    let offset = (offsetPage-1)*limits;
    const booksResult = await DB_restock.getAllShortStockBooks(offset,limits);
    const booksCountResult = await DB_restock.getAllShortStockBooksCount();
    const booksCount = booksCountResult[0].CNT;

    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminRestockAll',
        books:booksResult,
        start:offset,
        currentPage:offsetPage,
        pages:Math.ceil(booksCount/limits),
        cnt:booksCount,
        target:'/admin/restock?page='
    });
});


router.get('/update', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');

    console.log(req.query);
    let {bookId,restock} = req.query;
    if( bookId && restock ) await DB_restock.updateStock(bookId,restock);
    let limits = 50;
    let offsetPage = 1;
    if( req.query.page ) offsetPage = req.query.page;
    let offset = (offsetPage-1)*limits;
    const booksResult = await DB_restock.getAllShortStockBooks(offset,limits);
    const booksCountResult = await DB_restock.getAllShortStockBooksCount();
    const booksCount = booksCountResult[0].CNT;

    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminRestockAll',
        books:booksResult,
        start:offset,
        currentPage:offsetPage,
        pages:Math.ceil(booksCount/limits),
        cnt:booksCount,
        target:'/admin/restock?page='
    });
});
module.exports = router;