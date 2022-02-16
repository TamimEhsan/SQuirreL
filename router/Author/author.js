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
    const authorsResult = await DB_author.getAllAuthors();
    res.render('layout.ejs', {
        user:req.user,
        body:['allAuthorsPage'],
        title:'Authors',
        navbar:2,
        authors:authorsResult
    });
});

router.get('/:authorID', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }

    let limits = 25;
    let offsetPage = 1;
    if( req.query.page ) offsetPage = req.query.page;
    let offset = (offsetPage-1)*limits;
    const booksCountResult = await DB_book.getBookByAuthorIDCount(req.params.authorID);
    const booksCount = booksCountResult[0].CNT;

    const authorResult = await DB_author.getAuthorByID(req.params.authorID);
    const authorBookResult = await DB_book.getBookByAuthorID(req.params.authorID,offset,limits);
    if( authorResult.length === 0 )
        return res.redirect('/authors');
    res.render('layout.ejs', {
        user:req.user,
        body:['authorPage'],
        title:'Author',
        navbar:2,
        author:authorResult[0],
        books:authorBookResult,
        start:offset,
        page:offsetPage,
        pages:Math.ceil(booksCount/limits),
        cnt:booksCount,
        target:'/authors/'+req.params.authorID+'?page='
    });
});

module.exports = router;