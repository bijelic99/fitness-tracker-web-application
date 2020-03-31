const mongoose = require('mongoose')
const Schema = mongoose.Schema

//User schema and model
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is requiered"],
        unique: true
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: [true, "Email is requiered"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is requiered"]
    },
    picture_id: {
        type: Schema.ObjectId,
        default: "5e7dfa91af72c22a0492241e"
    },
    registered: {
        type: Date,
        default: Date.now
    }




})

const User = mongoose.model('User', userSchema)

module.exports = User