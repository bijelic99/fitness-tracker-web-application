const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for input object
const exerciseType = new Schema({
    exercise_name:{
        type: String,
        required: true
    }
    
})

const ExerciseType = mongoose.model("ExerciseType", exerciseType)

module.exports = ExerciseType