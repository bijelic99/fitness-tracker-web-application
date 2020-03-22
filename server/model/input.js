const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for input object
const inputSchema = new Schema({
    //user who uploaded it
    user_id: {
        type: Schema.ObjectId,
        default: null
    },
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
    }
})

const Input = mongoose.model("Input", inputSchema)

module.exports = Input