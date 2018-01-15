const path = require('path')
const mongoose = require('mongoose')

module.exports.getSkills = function(req, res) {
    const defaultSkills = [
        {
            id: 1,
            name: 'html',
            percents: 70,
            type: 1
        },
        {
            id: 2,
            name: 'php',
            percents: 70,
            type: 2
        },
        {
            id: 3,
            name: 'pug',
            percents: 70,
            type: 3
        }
    ]

    const skills = mongoose.model('skills')

    skills.find().then(item => {
        if (!item.length) {
            res.status(200).json({getSkills: defaultSkills})
        } else {
            res.status(200).json({getSkills: item})
        }
    })
}

module.exports.addSkills = function(req, res) {

    const data = req.body
    const Model = mongoose.model('skills')
    Model.db.dropDatabase()
    for (let i = 0; i < data.length; i++) {

        const item = new Model({
            id: data[i].id,
            name: data[i].name,
            percents: data[i].percents,
            type: data[i].type
        })

        item.save().then(item => {
            return res.status(200).json({status: 'Успешно добавленно в базу'})
        }, err => {
            res.status(404).json({status: 'При добовлении в базу произошла ошибка' + err})
        })
    }
}