const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

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
    }).populate('input').populate({ path: 'user', select: '_id firstName lastName username picture_id' }).lean().exec())
})

// @desc Updates post in database, only title and text can be changed, user needs to be authorized and it needs to be his post
// @route PATCH /posts/:postId
router.patch(`${route}/:postId`, authorization, async (req, res) => {
    var userId = req.user._id
    var postId = req.params.postId
    var post = await Post.findById(postId).exec()
    if (post) {
        if (post.user.toString() === userId) {
            if (req.body.title) post.title = req.body.title
            if (req.body.text) post.text = req.body.text
            if (req.body.visibility) post.visibility = req.body.visibility
            return res.json(await post.save())
        }
        else return res.sendStatus(403)
    }
    else return res.sendStatus(404)

})

// @desc Deletes post from database, user needs to be authorized and it needs to be his post
// @route DELETE /posts/:postId
router.delete(`${route}/:postId`, authorization, async (req, res) => {
    var userId = req.user._id
    var postId = req.params.postId
    var post = await Post.findById(postId).exec()
    if (await post) {
        if (await post.user.toString() === userId) {
            return res.json(await Post.findByIdAndDelete(post._id).exec())
        }
        else return res.sendStatus(403)
    }
    else return res.sendStatus(404)

})

// @desc Likes or dislikes a post, user needs to be authorized
// @route PATCH /posts/:postId/like
router.patch(`${route}/:post_id/like`, authorization, async (req, res) => {
    var post = await Post.findById(req.params.post_id).exec()
    var user_id = req.body.user_id
    if (post.likes.filter(u_id => u_id.toString() === user_id).length > 0) post.likes.splice(post.likes.findIndex(u_id => u_id.toString() === user_id), 1)
    else post.likes.push(user_id)
    return res.json(await post.save())

})

router.use(route, publicPosts)
router.use(route, authorization, usersPost)
router.use(route, authorization, friendsPosts)



module.exports = router

