const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for excercise object
const excerciseSchema = new Schema({
    //user who uploaded it
    user_id: {
        type: Schema.ObjectId,
        default: null
    },
    //is it a food or excercise or bmi
    type: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: [true, "Name is requiered"]
    },
    calories:{
        type: Number,
        required: [true, "Value is requiered"]
    },
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