const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for food object
const foodSchema = new Schema({
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