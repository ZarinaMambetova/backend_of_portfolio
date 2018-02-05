var express = require('express');
var router = express.Router();

const contrlHome = require('../controllers/homepage');
const contrlAbout = require('../controllers/about');
const contrlBlog = require('../controllers/blog');
const contrlWorks = require('../controllers/works');
const contrlUser = require('../controllers/user');

/* GET home page. */


router.get('/', function(req, res) {
    res.render('pages/index', { title: 'Express' });
});

// =================================== about
router.get('/about', function(req, res) {
    res.render('pages/about', { title: 'Express' });
});

router.get('/blog', function (req, res) {
    res.render('pages/blog', { title: 'Express' });
});

router.get('/getSkills', contrlAbout.getSkills)
router.post('/addSkills', contrlAbout.addSkills)

// ================================== Blog
// router.get('/blog', function(req, res) {
//     res.render('pages/blog', { title: 'Express' });
// });

// router.get('/getPosts', contrlBlog.getPosts)
// router.post('/addPosts', contrlBlog.addPosts)

router.get('/getarticle', contrlBlog.getArticles);
router.post('/addPosts', contrlBlog.createArticle); // isAdmin
router.put('/blog/:id', contrlBlog.editArticle); // isAdmin
router.delete('/blog/:id', contrlBlog.deleteArticle); // isAdmin



router.get('/my-works', function(req, res) {
    res.render('pages/my-works', { title: 'Express' });
});
router.post('/addwork', contrlWorks.addWorks)

router.get('/admin', function(req, res) {
    res.render('admin/index', { title: 'Express' });
})


const isAdmin = (req, res, next) => {
    // если в сессии текущего пользователя есть пометка о том, что он является
    // администратором
    if (req.session.isAdmin) {
        //то всё хорошо :)
        return next();
    }
    //если нет, то перебросить пользователя на главную страницу сайта
    res.redirect('/');
};


router.post('/user', contrlUser.isAuth);




module.exports = router;
