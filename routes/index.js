var express = require('express');
var router = express.Router();

const contrlHome = require('../controllers/homepage');
const contrlAbout = require('../controllers/about');
const contrlBlog = require('../controllers/blog');
const contrlWorks = require('../controllers/works');

/* GET home page. */
router.get('/', contrlHome.getIndex);
router.get('/about', contrlAbout.getAboutpage);
router.post('/admin/avatar', ctrlAdmin.uploadAvatar);
router.get('/blog', contrlBlog.getBlogpage);
router.get('/my-works', contrlWorks.getWorkspage);

module.exports = router;
