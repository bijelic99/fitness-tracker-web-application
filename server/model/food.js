const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for food object
const foodSchema = new Schema({
    foodType:{
        type: String,
        default: ''
    },
    quantity: {
        type: String,
        default: ''
    }
})

const Input = mongoose.model("FoodInput", foodSchema)

module.exports = Input