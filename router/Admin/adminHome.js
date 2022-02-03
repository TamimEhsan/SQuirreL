// libraries
const express = require('express');
const DB_book = require('../../Database/DB-book-api');

// creating router
const router = express.Router({mergeParams : true});

router.get('/', async (req, res) =>{

    if( req.admin == null )
        return res.redirect('/admin/login');
    const booksResult = await DB_book.getAllBooks();
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminHome',
        books:booksResult
    });

});

module.exports = router;