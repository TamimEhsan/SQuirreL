// libraries
const express = require('express');
// creating router
const router = express.Router({mergeParams : true});

const DB_publisher = require('../../../Database/DB-publisher');

router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const booksResult = await DB_publisher.getAllPublishers();
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminPublisherAll',
        books:booksResult
    });
});


router.get('/edit/:id', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    const publisherResult = await DB_publisher.getPublisherByID(req.params.id);
    if( publisherResult.length === 0 ) return res.redirect('/admin/author');
    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminPublisherEdit',
        publisher:publisherResult[0]
    });
});
router.get('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');

    res.render('adminLayout.ejs', {
        title:'home',
        page:'adminPublisherAdd',

    });
});
router.post('/add', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    console.log(req.body);
    const {name,image} = req.body;
    await DB_publisher.addPublisher(name,image);
    return res.redirect('/admin/publisher');

});

router.post('/edit', async (req, res) =>{
    // if logged in, delete token from database
    if( req.admin == null )
        return res.redirect('/admin/login');
    console.log(req.body);
    const {id,name,image} = req.body;
    await DB_publisher.updatePublisher(id,name,image);
    return res.redirect('/admin/publisher');

});


module.exports = router;