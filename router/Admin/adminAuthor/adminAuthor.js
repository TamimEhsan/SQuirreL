// libraries
const express = require('express');
// creating router
const router = express.Router({mergeParams : true});

const DB_author = require('../../../Database/DB-author-api');

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const booksResult = await DB_author.getAllAuthors();
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminAuthorAll',
        books:booksResult
    });
});

router.get('/edit/:id', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const authorResult = await DB_author.getAuthorByID(req.params.id);
    if( authorResult.length === 0 ) return res.redirect('/admin/author');
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminAuthorEdit',
        author:authorResult[0]
    });
});
router.get('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');

    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminAuthorAdd',

    });
});
router.post('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    console.log(req.body);
    const {name,image,description} = req.body;
   await DB_author.addAuthor(name,image,description);
    return res.redirect('/admin/author');
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminAuthorEdit',
        author:authorResult[0]
    });
});

router.post('/edit', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    // console.log(req.body);
    const {id,name,image,description} = req.body;
    await DB_author.updateAuthor(id,name,image,description);
    return res.redirect('/admin/author');
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminAuthorEdit',
        author:authorResult[0]
    });
});

module.exports = router;