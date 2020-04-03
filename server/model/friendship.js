const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for input object
const friendshipSchema = new Schema({
    personA:{
        required: true,
        type: Schema.ObjectId,
        ref: "User"
    },
    personB:{
        required: true,
        type: Schema.ObjectId,
        ref: "User"
    },
    friendsFrom:{
        type: Date,
        default: Date.now
    }
    
})

const Friendship = mongoose.model("Friendship", friendshipSchema)

module.exports = Friendship