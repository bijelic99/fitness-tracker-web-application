const express = require('express')
const authorization = require('../../middleware/authorization')
const User = require('../../model/user')
const FriendRequest = require('../../model/friendRequest')

const router = express.Router()

const route = '/friend-requests'

// @desc adds the sent friend request to the database
// @route POST /friend-requests
router.post(route, authorization, async (req, res) => {

    if (req.user._id === req.body.sender_id) {
        try {
            var recipient = await User.findOne({
                _id: req.recipient_id
            }).exec()
            if (recipient) {
                var friendRequest = new FriendRequest({
                    sender: req.body.sender_id,
                    recipient: req.body.recipient_id
                })
                await friendRequest.save()
                return res.json({ successful: true })
            }
            else return res.sendStatus(404)
        }
        catch{
            return res.sendStatus(500)
        }

    }
    else return res.sendStatus(403)
})

// @desc retrieves recived friend requests
// @route GET /friend-requests/:user_id
router.get(`${route}/:user_id`, authorization, async (req, res) => {
    if (req.user._id === req.params.user_id) {
        try{
        var friendRequests = await FriendRequest.find({
            recipient: user_id
        }).populate({
            path: 'sender',
            select: "_id firstName lastName username picture_id"
        }).sort("-sentAt").lean().exec()
        return res.json(friendRequests)
    }
    catch{
        return res.sendStatus(500)
    }
    }
    else return res.sendStatus(403)
})