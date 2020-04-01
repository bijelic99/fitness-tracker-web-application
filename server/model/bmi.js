const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for input object
const bmiSchema = new Schema({
    height:{
        type: Number,
        default: 0
    },
    mass:{
        type: Number,
        default: 0
    }
    
})

const BmiInput = mongoose.model("BmiInput", bmiSchema)

module.exports = BmiInput