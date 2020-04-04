const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for input object
const inputSchema = new Schema({
    //user who uploaded it
    user_id: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    //is it a food or excercise or bmi
    type: {
        type: String,
        required: true,
        enum: ['BmiInput', 'ExerciseInput', 'FoodInput']
    },
    name:{
        type: String,
        required: true
    },
    value:{
        type: Number,
        required: [true, "Value is requiered"]
    },
    input_data:{
        type: Schema.ObjectId,
        required: true,
        refPath: 'type'
    },
    added_at:{
        type: Date,
        default: Date.now
    }
})

const Input = mongoose.model("Input", inputSchema)

module.exports = Input