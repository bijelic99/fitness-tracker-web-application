const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for excercise object
const exerciseSchema = new Schema({
    exerciseType:{
        type: String,
        default: null
    },
    length:{
        type: String,
        default: null
    }
})

const Input = mongoose.model("ExerciseInput", exerciseSchema)

module.exports = Input