// libraries
const express = require('express');
const DB_author = require('../../Database/DB-author-api');
const DB_book = require('../../Database/DB-book-api');
// creating router
const router = express.Router({mergeParams : true});

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const bookResult = await DB_book.getAllBooks();
   // const authorsResult = await DB_author.getAllAuthors();
    res.render('layout.ejs', {
        user:req.user,
        body:['bestseller'],
        title:'Best Seller',
        navbar:4,
        books:bookResult
    });
});


module.exports = router;