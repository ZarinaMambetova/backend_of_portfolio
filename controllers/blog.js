module.exports.getBlogpage = function (req, res, next) {
    res.render('pages/blog', { title: 'Express' });
}