// libraries
const express = require('express');
//const marked = require('marked');

const router = express.Router({mergeParams : true});

//const DB_blog = require("../DB-codes/DB-blog-api");

//const blogUtils = require("../utils/blog-utils"); //require(process.env.ROOT + '/utils/blog-utils');

// sub-routers
const signupRouter = require('./auth/signup');
const loginRouter = require('./auth/login');
const logoutRouter = require('./auth/logout');

const bookRouter = require('./Books/book');
const authorRouter = require('./Author/author');
const publisherRouter = require('./Publisher/publisher');

const reviewRouter = require('./Books/reviews');

const cartRouter = require('./Cart/cart');

const orderRouter = require('./My-Section/orders');
const profileRouter = require('./My-Section/profile');
const myreviewRouter = require('./My-Section/reviews');

/*const userRouter = require('./users/users.js');
const profileRouter = require('./profile/profile');
const blogRouter = require('./blog/blog');
const countryRouter = require('./country/countryAll');
const contestRouter = require('./contest/contest');
const problemsRouter = require('./problems/problems');
const apiRouter = require('./api/api');
const teamsRouter = require('./teams/teams');
const aboutRouter = require('./about/about');
*/
//const rightPanelUtils = require('../utils/rightPanel-utils');

// ROUTE: home page
router.get('/', async (req, res) =>{
    if( req.user == null )
        return res.redirect('/login');
    console.log(req.user);
    res.render('layout.ejs', {
        user:req.user,
        body:['landingPage'],
        title:'Squirrel',
        publishers:["dfsdf","sfsdf","fsdfsd"]
    });
    /*const id = (req.user === null)? null : req.user.id;
    const blogs = await DB_blog.getAdminBlogs(id);

    for(let i = 0; i<blogs.length; i++){
        await blogUtils.blogProcess(blogs[i]);
        blogs[i].BODY = marked(blogs[i].BODY);
    }

    let rightPanel = await rightPanelUtils.getRightPanel(req.user);

    res.render('layout.ejs', {
        title: 'ForceCodes', 
        body : ['panel-view', 'blog'],
        user: req.user,
        blogs : blogs,
        rightPanel : rightPanel
    });*/
});

// setting up sub-routers
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

router.use('/books', bookRouter);
router.use('/authors', authorRouter);
router.use('/publishers', publisherRouter);

router.use('/reviews', reviewRouter);

router.use('/cart', cartRouter);

router.use('/my-section/orders', orderRouter);
router.use('/my-section/profile', profileRouter);
router.use('/my-section/reviews', myreviewRouter);

/*router.use('/users', userRouter);
router.use('/profile', profileRouter);
router.use('/blog', blogRouter);
router.use('/country', countryRouter);
router.use('/contest', contestRouter);
router.use('/api', apiRouter);
router.use('/problems', problemsRouter);
router.use('/team', teamsRouter);
router.use('/about', aboutRouter);
*/

module.exports = router;