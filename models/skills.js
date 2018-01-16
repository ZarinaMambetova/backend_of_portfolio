const mongoose = require('mongoose')
const http = require('request');

const apiOptions = {
    server: "http://localhost:3000"
}

const Schema = mongoose.Schema

const SkillsSchema = new Schema({
    id: Number,
    name: String,
    percents: Number,
    type: Number
})


mongoose.model('skills', SkillsSchema)