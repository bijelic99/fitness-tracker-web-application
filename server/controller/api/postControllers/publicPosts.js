//Used when public posts are requested
const express = require('express')
const router = express.Router()

const Post = require('../../../model/post')

const route = '/public'


//retrives public posts
router.get(route, async (req, res) => {
    var page = parseInt(req.query.page)
    var limit = parseInt(req.query.limit)

    //finds the data in the database, sorts it by time of creation, returns it to user, takes limit and page in to account
    Post.paginate({
        visibility: 'Public'
    },
    {
        sort: { postedAt: -1 },
        page: page,
        limit: limit,
        populate: ['input', {
            path: 'user',
            select: 'username firstName lastName _id picture_id'
        }],
        lean: true
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(400).json({ error: err.message })
    })
})



module.exports = router