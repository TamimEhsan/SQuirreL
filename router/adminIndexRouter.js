// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});

const DB_book = require('../Database/DB-book-api');

const adminAuth = require('../middlewares/auth').adminAuth;
// sub-routers

const loginRouter = require('./Admin/auth/login');
router.use('/login', loginRouter);

router.use(adminAuth);

const logoutRouter = require('./Admin/auth/logout');
const bookRouter = require('./Admin/adminBooks/adminBook');
const authorRouter = require('./Admin/adminAuthor/adminAuthor');
const publisherRouter = require('./Admin/adminPublisher/adminPublisher');
// ROUTE: home page
router.get('/', require('./Admin/adminHome'));

// setting up sub-routers

router.use('/logout', logoutRouter);
router.use('/book', bookRouter);
router.use('/author', authorRouter);
router.use('/publisher', publisherRouter);







module.exports = router;