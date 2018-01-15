const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SkillsSchema = new Schema({
    id: Number,
    name: String,
    percents: Number,
    type: Number
})


mongoose.model('skills', SkillsSchema)