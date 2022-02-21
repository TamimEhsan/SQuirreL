// libraries
const express = require('express');
const DB_publisher = require('../../Database/DB-publisher');
const DB_book = require('../../Database/DB-book-api');
// creating router
const router = express.Router({mergeParams : true});

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const publishersResult = await DB_publisher.getAllPublishers();
    res.render('layout.ejs', {
        user:req.user,
        body:['allPublishersPage'],
        title:'Publishers',
        navbar:3,
        publishers:publishersResult
    });
});

router.get('/:publisherID', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }

    let limits = 25;
    let offsetPage = 1;
    if( req.query.page ) offsetPage = req.query.page;
    let offset = (offsetPage-1)*limits;
    const booksCountResult = await DB_book.getBookByPublisherIDCount(req.params.publisherID);
    const booksCount = booksCountResult[0].CNT;

    const publisherResult = await DB_publisher.getPublisherByID(req.params.publisherID);
    const publisherBookResult = await DB_book.getBooksByPublisherID(req.params.publisherID,offset,limits);
    if( publisherResult.length === 0 )
        return res.redirect('/publishers');
    res.render('layout.ejs', {
        user:req.user,
        body:['publisherPage'],
        title:'Publishers',
        navbar:2,
        publisher:publisherResult[0],
        books:publisherBookResult,
        start:offset,
        page:offsetPage,
        pages:Math.ceil(booksCount/limits),
        cnt:booksCount,
        target:'/publishers/'+req.params.publisherID+'?page='
    });
});

module.exports = router;