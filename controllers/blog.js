 const path = require('path')
// const mongoose = require('mongoose')

// module.exports.getPosts = function (req, res, next) {

//     const defPosts = [{ 
//             'fields.title': 'Новая статья',
//                 'fields.date': '13.09.2019',
//                     'fields.text': 'Веб-разработка — процесс создания веб-сайта или веб-приложения. Основными этапами процесса являются веб-дизайн, вёрстка страниц, программирование             для веб на стороне клиента и сервера, а также конфигурирование веб-сервера.(с)'
//       }]

// const posts = mongoose.model('posts')

// posts.find().then(items => {
//     if (!items.length) {
//         res.status(200).json({ getPosts: defPosts })
//     } else {
//         res.status(200).json({ getPosts: item })
//     }
// })
// }

// module.exports.addPosts = function (req, res) {

//     const data = req.body
//     const Model = mongoose.model('posts')
//     Model.db.dropDatabase()
//     for (let i = 0; i < data.length; i++) {

//         const item = new Model({
//             title: data[i].title,
//             data: data[i].data,
//             text: data[i].text
//         })

//         item.save().then(item => {
//             return res.status(200).json({ status: 'Успешно добавленно в базу' })
//         }, err => {
//             res.status(404).json({ status: 'При добовлении в базу произошла ошибка' + err })
//         })
//     }
// }

const mongoose = require('mongoose')

module.exports.getArticles = (req, res) => {
    const Blog = mongoose.model('blog');

    Blog.find().then(items => {
        res.status(200).json({ articles: items });
    });
};

module.exports.createArticle = (req, res) => {
    //создаем новую запись блога и передаем в нее поля из формы
    const Model = mongoose.model('blog');

    let item = new Model({
        title: req.body.title,
        date: new Date(req.body.date),
        text: req.body.text
    });
    //сохраняем запись в базе
    item
        .save()
        .then(item => {
            return res.status(201).json({ message: 'Запись успешно добавлена' });
        })
        .catch(err => {
            res.status(400).json({
                message: `При добавление записи произошла ошибка:  + ${err.message}`
            });
        });
};

module.exports.editArticle = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    let data = {
        title: req.body.title,
        date: new Date(req.body.date),
        body: req.body.text
    };

    const Model = mongoose.model('blog');

    Model.findByIdAndUpdate(id, { $set: data })
        .then(item => {
            // console.log(item);
            if (!!item) {
                res.status(200).json({ message: 'Запись успешно обновлена' });
            } else {
                res.status(404).json({ message: 'Запись в БД не обнаружена' });
            }
        })
        .catch(err => {
            res.status(400).json({
                message: `При обновлении записи произошла ошибка:  + ${err.message}`
            });
        });
};

module.exports.deleteArticle = (req, res) => {
    const id = req.params.id;
    const Model = mongoose.model('blog');

    Model.findByIdAndRemove(id)
        .then(item => {
            if (!!item) {
                res.status(200).json({ message: 'Запись успешно удалена' });
            } else {
                res.status(404).json({ message: 'Запись в БД не обнаружена' });
            }
        })
        .catch(err => {
            res.status(400).json({
                message: `При удалении записи произошла ошибка: ' + ${err.message}`
            });
        });
};