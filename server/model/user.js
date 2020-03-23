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
        type: String
    },
    lastName: {
        type: String
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
    picture: {
        type: String,
    },
    //references to our friends
    friends: {
        type: [Schema.ObjectId]
    },
    registered: {
        type: Date,
        default: Date.now
    }




})

const User = mongoose.model('User', userSchema)

module.exports = User