var express = require('express');
var router = express.Router();

const contrlHome = require('../controllers/homepage');
const contrlAbout = require('../controllers/about');
const contrlBlog = require('../controllers/blog');
const contrlWorks = require('../controllers/works');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('pages/index', { title: 'Express' });
});

// =================================== about
router.get('/about', function(req, res) {
    res.render('pages/about', { title: 'Express' });
});

router.get('/getSkills', contrlAbout.getSkills)
router.post('/addSkills', contrlAbout.addSkills)

// ================================== Blog
router.get('/blog', function(req, res) {
    res.render('pages/blog', { title: 'Express' });
});

router.get('/my-works', function(req, res) {
    res.render('pages/my-works', { title: 'Express' });
});
router.post('/addwork', contrlWorks.addWorks)

router.get('/admin', function(req, res) {
    res.render('admin/index', { title: 'Express' });
})

module.exports = router;
