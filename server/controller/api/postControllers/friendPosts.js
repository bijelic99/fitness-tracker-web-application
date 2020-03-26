//Used when public posts are requested
const express = require('express')
const router = express.Router()

const Post = require('../../../model/post')

const route = '/friends'
//not finished
router.get(`${route}/:userId`, async (req, res)=>{
    var page = parseInt(req.query.page)
    var limit = parseInt(req.query.limit)
    var userId = req.params.userId

    var posts = Post.find({
        user_id: userId

    }).paginate({}, { sort: { postedAt: -1}, page: page, limit: limit, lean: true}).then(data => {
        console.log(data)
        res.json(data)
    }).catch(err => {
        res.status(400).json({error: err.message})
    })
})



module.exports = router