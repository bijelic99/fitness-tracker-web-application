const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for input object
const bmiSchema = new Schema({
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
    value:{
        type: Number,
        required: [true, "Value is requiered"]
    },
    height:{
        type: Number,
        default: 0
    },
    mass:{
        type: Number,
        default: 0
    }
    
})

const Input = mongoose.model("BmiInput", bmiSchema)

module.exports = Input