const mongoose = require('mongoose')
const http = require('request');

const apiOptions = {
    server: "http://localhost:3000"
}


// const Schema = mongoose.Schema

// const BlogSchema = new Schema({
//     'fields.title': String,
//     'fields.date': String,
//     'fields.text': String
// })

// mongoose.model('posts', BlogSchema)

'use strict';


    const Schema = mongoose.Schema
    
    const BlogSchema = new Schema({
        title: {
            type: String,
            required: [true, 'Укажите заголовок статьи']
        },
        text: {
            type: String,
            required: [true, 'Укажите содержимое статьи']
        },
        date: {
            type: Date,
            default: Date.now,
            required: [true, 'Укажите дату публикации']
        }
    });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('blog', BlogSchema);