const mongoose = require('mongoose')
const Schema = mongoose.Schema

//schema for input object
const friendRequestSchema = new Schema({
    sender:{
        required: true,
        type: Schema.ObjectId,
        ref: "User"
    },
    recipient:{
        required: true,
        type: Schema.ObjectId,
        ref: "User"
    },
    sentAt:{
        type: Date,
        default: Date.now
    }
    
})

const FriendRequest = mongoose.model("FriendRequest", bmiSchema)

module.exports = FriendRequest