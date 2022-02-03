// libraries
const express = require('express');
const bcrypt = require('bcrypt');
const authUtils = require('../../../utils/auth-utils');
// my modules


// creating router
const router = express.Router({mergeParams : true});

// ROUTE: login (get)
router.get('/', (req, res) => {
    // if not logged in take to login page
    if(req.admin == null){
        const errors = [];
        return res.render('adminLayout.ejs', {
            title : 'Login - Squirrel',
            page : 'adminLogin',
            user : null,
            form: {
                email: "",
                password: ""
            },
            errors : errors
        })
    } else {
        res.redirect('/admin');
    }
});


// ROUTE: login (post)
// Launches when submit button is pressed on form
router.post('/', async (req, res) => {
    // if not logged in take perform the post
    if(req.user == null){
        let results, errors = [];
        // get login info for handle (id, handle, password)
        //results = await DB_auth.getLoginInfoByEmail(req.body.email);

        // if no result, there is no such user
        if(req.body.email !== 'admin' || req.body.password !== 'admin'){
            errors.push('No such user found');
        } else {
            // match passwords

            // if successful login the user
            await authUtils.loginAdmin(res, 7);

        }

        // if any error, redirect to login page but with form information, else redirect to homepage
        if(errors.length == 0){
            res.redirect('/admin');
        } else {
            res.render('adminLayout.ejs', {
                title : 'Login - Squirrel',
                page : 'adminLogin',
                errors : errors,
                form: {
                    email: req.body.email,
                    password: req.body.password
                }
            });
        }
    } else {
        //console.log(req.user);
        res.redirect('/');
    }
});

module.exports = router;