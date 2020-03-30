//Used when public posts are requested
const express = require('express')
const router = express.Router()

const Post = require('../../../model/post')

//retrives users posts, sends 403 if logged in user isnt the same as user for whom posts are requested
router.get(`/:userId`, async (req, res) => {
    var page = parseInt(req.query.page)
    var limit = parseInt(req.query.limit)
    var userId = req.params.userId

    if (userId === req.user._id) {

        //finds the data in the database, sorts it by time of creation, returns it to user, takes limit and page in to account
        Post.paginate({
            user: userId,

        }, {
            sort: { postedAt: -1 },
            page: page,
            limit: limit,
            populate: ['input', {
                path: 'user',
                select: 'username firstName lastName _id picture_id'
            }],
            lean: true
        }).then(data => res.json(data)).catch(err => res.status(400).json(err))
    } else return res.sendStatus(403)
})



module.exports = router