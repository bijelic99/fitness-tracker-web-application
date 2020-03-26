const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Schema = mongoose.Schema

//schema for post object
const inputSchema = new Schema({
    //user who uploaded it
    user_id: {
        type: Schema.ObjectId,
        ref: "User"
    },
    title:{
        type: String,
        required: true
    },
    text:{
        type: String
        required: false,
        default: ''
    },
    input: {
        type: Schema.ObjectId,
        required: false,
        default: null,
        ref: 'Input'
    },
    //time of upload
    postedAt:{
        type: Date,
        default: Date.now
    },
    visibility: {
        type: String,
        required: false,
        default: 'Private'
    },
    //reference to users who liked it
    likes: [Schema.ObjectId]
})

inputSchema.plugin(mongoosePaginate)

const Post = mongoose.model("Post", inputSchema)

module.exports = Post