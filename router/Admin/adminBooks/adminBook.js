// libraries
const express = require('express');
// creating router
const router = express.Router({mergeParams : true});

const DB_book = require('../../../Database/DB-book-api');
const DB_author = require('../../../Database/DB-author-api');
const DB_publisher = require('../../../Database/DB-publisher');

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const booksResult = await DB_book.getAllBooks();
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminBookAll',
        books:booksResult
    });
});

router.get('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const authorResult = await DB_author.getAllAuthors();
    const publisherResult = await DB_publisher.getAllPublishers();
    res.render('adminLayout.ejs', {
        title:'Add Book',
        page:'adminBookAdd',
        authors:authorResult,
        publishers:publisherResult
    });
});

router.get('/edit/:id', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const booksResult = await DB_book.getBookByID(req.params.id);
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminBookEdit',
        book:booksResult[0]
    });
});

router.post('/edit', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    console.log(req.body);
    const {id,image,page,year,price,edition} = req.body;
    const updateResult = await DB_book.editBook(id,image,page,year,price,edition);
    res.redirect('/admin/book')
});
router.post('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    console.log(req.body);
    const {name,author_id,publisher_id,image,language,isbn,page,year,price,edition} = req.body;
    const addResult = await DB_book.addBook(name,author_id,publisher_id,image,language,isbn,page,year,price,edition);
    //const updateResult = await DB_book.editBook(id,image,page,year,price,edition);
    res.redirect('/admin/book');
});
module.exports = router;