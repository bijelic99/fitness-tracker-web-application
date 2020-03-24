const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for food object
const foodSchema = new Schema({
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
    foodType:{
        type: String,
        default: ''
    },
    quantity: {
        type: Number,
        default: 0
    }
})

const Input = mongoose.model("FoodInput", foodSchema)

module.exports = Input