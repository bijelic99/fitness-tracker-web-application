const express = require('express')
const router = express.Router()

const authorization = require('../../middleware/authorization')

const publicPosts = require('./postControllers/publicPosts')
const usersPost = require('./postControllers/usersPosts')
const friendsPosts = require('./postControllers/friendsPosts')

const route = '/posts'

const Post = require('../../model/post')



// @desc Adds new post to the database, user needs to be authorized
// @route POST /posts
router.post(route, authorization, async (req, res) => {
    var post = new Post(req.body)
    var { _id } = await post.save()
    res.json(await Post.findOne({
        _id: _id
    }).populate('input').populate({path: 'user', select: '_id firstName lastName username picture_id'}).lean().exec())
})

router.use(route, publicPosts)
router.use(route, authorization, usersPost)
router.use(route, authorization, friendsPosts)



module.exports = router

