// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});
const DB_stats = require('../Database/DB-userSite-stats-api');
// sub-routers
const signupRouter = require('./auth/signup');
const loginRouter = require('./auth/login');
const logoutRouter = require('./auth/logout');

const bookRouter = require('./Books/book');
const authorRouter = require('./Author/author');
const publisherRouter = require('./Publisher/publisher');
const bestsellerRouter = require('./Bestseller/bestseller');

const reviewRouter = require('./Books/reviews');

const cartRouter = require('./Cart/cart');

const orderRouter = require('./My-Section/orders');
const profileRouter = require('./My-Section/profile');
const myreviewRouter = require('./My-Section/reviews');
const mywishListRouter = require('./My-Section/wishlist');



// ROUTE: home page
router.get('/', async (req, res) =>{
    if( req.user == null )
        return res.redirect('/login');

    const mostReviewedBooks = await DB_stats.getMostReviewedBooksByMonth();
    const mostSoldBooks = await DB_stats.getMostSoldBooksOfLastMonth();
    const authorsWithMostSoldBooks = await DB_stats.getAuhtorsWithMostSoldBooksByMonth();
    const recentlySoldBooks = await DB_stats.getRecentlySoldBooks();
    console.log('aaaaaaaaaaaa');
    const topBooksOfJafor = await DB_stats.getTopSoldBooksByAuthor(3853);
    const topBooksOfHumayun = await DB_stats.getTopSoldBooksByAuthor(3861);
    const topBooksOfRowling = await DB_stats.getTopSoldBooksByAuthor(22);
    console.log('bbbbbbbbbbbb');
    res.render('layout.ejs', {
        user:req.user,
        body:['landingPage'],
        title:'Squirrel',
        publishers:["dfsdf","sfsdf","fsdfsd"],

        mostReviewedBooks:mostReviewedBooks,
        mostSoldBooks:mostSoldBooks,
        recentlySoldBooks:recentlySoldBooks,
        topBooksOfJafor:topBooksOfJafor,
        topBooksOfHumayun:topBooksOfHumayun,
        topBooksOfRowling:topBooksOfRowling
    });

});



// setting up sub-routers

router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

router.use('/books', bookRouter);
router.use('/authors', authorRouter);
router.use('/publishers', publisherRouter);
router.use('/aboutus',bestsellerRouter);

router.use('/reviews', reviewRouter);

router.use('/cart', cartRouter);

router.use('/my-section/orders', orderRouter);
router.use('/my-section/profile', profileRouter);
router.use('/my-section/reviews', myreviewRouter);
router.use('/my-section/wishlist', mywishListRouter);



module.exports = router;