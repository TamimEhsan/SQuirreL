// libraries
const express = require('express');
const DB_book = require('../../Database/DB-book-api');
const DB_review = require('../../Database/DB-review-api');
const DB_wish = require('../../Database/DB-wishlist-api');

// creating router
const router = express.Router({mergeParams : true});

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    let limits = 25;
    let offsetPage = 1;
    if( req.query.page ) offsetPage = req.query.page;
    let offset = (offsetPage-1)*limits;
    const booksResult = await DB_book.getAllBooks(offset,limits);
    const booksCountResult = await DB_book.getAllBooksCount();
    const booksCount = booksCountResult[0].CNT;
    res.render('layout.ejs', {
        user:req.user,
        body:['allBooksPage'],
        title:'Books',
        navbar:1,
        books:booksResult,
        start:offset,
        page:offsetPage,
        pages:Math.ceil(booksCount/limits),
        cnt:booksCount,
        target:"/books?page="
    });
});

router.get('/search', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }

    let limits = 25;
    let offsetPage = 1;
    if( req.query.page ) offsetPage = req.query.page;
    let offset = (offsetPage-1)*limits;
    const booksCountResult = await DB_book.searchBooksCount(req.query.keyword);
    const booksCount = booksCountResult[0].CNT;
    const booksResult = await DB_book.searchBooks(req.query.keyword,offset,limits);
    res.render('layout.ejs', {
        user:req.user,
        body:['allBooksPage'],
        title:'Books',
        navbar:1,
        books:booksResult,
        start:offset,
        page:offsetPage,
        pages:Math.ceil(booksCount/limits),
        cnt:booksCount,
        target:'/books/search?keyword='+req.query.keyword+'&page='
    });
});
router.get('/:bookID', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const booksResult = await DB_book.getBookByID(req.params.bookID);
    if( booksResult.length === 0 )
        return res.redirect('/');
    const canReview = await DB_review.hasBookOrdered(req.user.id,req.params.bookID);
    let hasReviewd = await DB_review.hasReviewdBook(req.user.id,req.params.bookID);
    let addedToWishList = await DB_wish.hasAdded(req.user.id,req.params.bookID);
    let reviews = await DB_review.getAllReviewsByBook(req.params.bookID);

    res.render('layout.ejs', {
        user:req.user,
        body:['bookPage'],
        title:'Books',
        navbar:1,
        book:booksResult[0],
        reviews:reviews,
        canReview:canReview,
        hasReviewd:hasReviewd,
        hasAddedWish:addedToWishList
    });
});

router.get('/list/toggle/:bookId', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    let user_id = req.user.id;
    let book_id = req.params.bookId;
    let hasAdded = await DB_wish.hasAdded(user_id,book_id);


    if( hasAdded )  await DB_wish.removeFromList(user_id,book_id);
    else await DB_wish.addToWishlist(user_id,book_id);
    return res.redirect('/books/'+book_id);

    return res.redirect('/books/'+req.body.bookId);
});

module.exports = router;