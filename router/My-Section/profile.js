// libraries
const express = require('express');
const DB_profile = require('../../Database/DB-profile-api');

// creating router
const router = express.Router({mergeParams : true});



router.get('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const userId = req.user.id;

    const profileResult = await DB_profile.getProfile(userId);
    res.render('layout.ejs', {
        user:req.user,
        body:['profile'],
        title:'Profile',
        navbar:-1,
        user:profileResult[0]
    });
});

router.get('/edit', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const userId = req.user.id;
    const profileResult = await DB_profile.getProfile(userId);
    res.render('layout.ejs', {
        user:req.user,
        body:['profileEdit'],
        title:'Profile',
        navbar:-1,
        user:profileResult[0]
    });
});

router.post('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.user === null){
        return res.redirect('/login');
    }
    const userId = req.user.id;

    console.log(req.body);
    const {name,dob,phone,email,image} = req.body;
    const updateResult = await DB_profile.updateProfile(req.user.id,name,dob,phone,image);
    return res.redirect('/my-section/profile');
    res.render('layout.ejs', {
        user:req.user,
        body:['profile'],
        title:'Profile',
        navbar:-1
    });
});




module.exports = router;