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
    const publisherResult = await DB_publisher.getPublisherByID(req.params.publisherID);
    const publisherBookResult = await DB_book.getBooksByPublisherID(req.params.publisherID);
    if( publisherResult.length === 0 )
        return res.redirect('/authors');
    res.render('layout.ejs', {
        user:req.user,
        body:['publisherPage'],
        title:'Publishers',
        navbar:2,
        publisher:publisherResult[0],
        books:publisherBookResult
    });
});

module.exports = router;