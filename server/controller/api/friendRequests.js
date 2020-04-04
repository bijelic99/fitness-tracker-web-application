const express = require('express')
const authorization = require('../../middleware/authorization')
const User = require('../../model/user')
const FriendRequest = require('../../model/friendRequest')
const Friendship = require('../../model/friendship')

const router = express.Router()

const route = '/friend-requests'

// @desc adds the sent friend request to the database
// @route POST /friend-requests
router.post(route, authorization, async (req, res) => {

    if (req.user._id === req.body.sender_id) {
        try {
            var recipient = await User.findOne({
                _id: req.body.recipient_id
            }).exec()
            if (recipient) {
                var friendRequest = new FriendRequest({
                    sender: req.body.sender_id,
                    recipient: req.body.recipient_id
                })
                await friendRequest.save()
                return res.json(await friendRequest.save())
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
// @route GET /friend-requests/:user_id/received
router.get(`${route}/:user_id/received`, authorization, async (req, res) => {
    if (req.user._id === req.params.user_id) {
        try {
            var friendRequests = await FriendRequest.find({
                recipient: req.params.user_id
            }).populate({
                path: 'sender',
                select: "_id firstName lastName username picture_id"
            }).sort("-sentAt").lean().exec()
            return res.json(friendRequests)
        }
        catch (err) {
            console.log(err)
            return res.sendStatus(500)
        }
    }
    else return res.sendStatus(403)
})

// @desc retrieves sent friend requests
// @route GET /friend-requests/:user_id/sent
router.get(`${route}/:user_id/sent`, authorization, async (req, res) => {
    if (req.user._id === req.params.user_id) {
        try {
            var friendRequests = await FriendRequest.find({
                sender: user_id
            }).populate({
                path: 'recipient',
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

// @desc accepts or rejects friend request
// @route POST /friend-requests/:request_id/respond
router.post(`${route}/respond`, authorization, async (req, res) => {
    var request_id = req.body.request_id
    var user_id = req.body.user_id
    var accepted = req.body.accepted //friend request is accepted if true else if false its rejected
    if (request_id && user_id && typeof accepted === 'boolean') {
        if (user_id === req.user._id) {
            try {
                var friendRequest = await FriendRequest.findOne({
                    _id: req.body.request_id
                }).exec()
                if (friendRequest) {
                    if (friendRequest.recipient.toString() === user_id) {
                        var friendship = null
                        if (accepted) {
                            friendship = new Friendship({
                                personA: friendRequest.sender,
                                personB: friendRequest.recipient
                            })
                            friendship = await friendship.save()
                        }
                        await FriendRequest.deleteOne({
                            _id: friendRequest._id
                        }).exec()
                        res.json(await Friendship.findById(friendship._id).populate({
                            path: 'personA',
                            select: 'username firstName lastName email picture_id'
                        }).lean().exec())
                    }
                    else return res.sendStatus(403)
                }
                else return res.sendStatus(404)
            } catch (err) {
                console.log(err)
                return res.sendStatus(500)
            }
        } else return res.sendStatus(403)
    }
    else return res.sendStatus(400)

})

module.exports = router