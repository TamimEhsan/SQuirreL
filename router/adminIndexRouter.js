// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});

const adminAuth = require('../middlewares/auth').adminAuth;
// sub-routers

const loginRouter = require('./Admin/auth/login');
router.use('/login', loginRouter);

router.use(adminAuth);

const logoutRouter = require('./Admin/auth/logout');

// ROUTE: home page
router.get('/', async (req, res) =>{

    if( req.admin == null )
        return res.redirect('/admin/login');
    res.render('adminLayout.ejs', {
        title:'home',
        page:'home',
    });

});

// setting up sub-routers

router.use('/logout', logoutRouter);






module.exports = router;