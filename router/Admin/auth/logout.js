// libraries
const express = require('express');


// creating router
const router = express.Router({mergeParams : true});

router.post('/', async (req, res) =>{
    // if logged in, delete token from database
    if(req.admin !== null){
        // set null in token
        //await DB_auth.updateUserTokenById(req.user.id, null);
    }
    res.clearCookie("adminSessionToken");
    res.redirect('/admin/login');
});

module.exports = router;