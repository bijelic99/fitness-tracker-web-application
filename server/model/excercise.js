const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for excercise object
const excerciseSchema = new Schema({
    excerciseType:{
        type: String,
        default: null
    },
    length:{
        type: String,
        default: null
    }
})

const Input = mongoose.model("ExcerciseInput", excerciseSchema)

module.exports = Input