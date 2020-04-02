const express = require('express')
const router = express.Router()
const route = '/users'
const User = require('../../model/user')
const authorization = require('../../middleware/authorization')
const bcrypt = require('bcryptjs')
const { profilePictureUpload, gridfs } = require('../../middleware/profilePictureUploadMiddleware')
const mongoose = require('mongoose')





// @desc Retrieves all users
// @route GET /users
router.get(`${route}`, async (req, res) => {
    try {
        var searchQuery = req.query.query
        var users = User.find({})
        if (searchQuery) users.find({
            $or:
                [
                    { username: new RegExp(searchQuery, 'i') },
                    { email: new RegExp(searchQuery, 'i') },
                    { firstName: new RegExp(searchQuery, 'i') },
                    { lastName: new RegExp(searchQuery, 'i') }
                ]

        })
        users.select("_id username email firstName lastName picture_id")
        return res.json(await users.lean().exec())
    }
    catch{
        return res.sendStatus(500)
    }
})

// @desc Changes users password
// @route PUT /users/:userId/changePassword
router.put(`${route}/:userId/changePassword`, authorization, async (req, res) => {
    var userId = req.params.userId
    if (req.user && req.user._id === userId) {
        var user = await User.findOne({
            _id: userId,
        }).exec()
        if (user) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(req.body.password, salt)
            await user.save()
            return res.json({ success: true })
        }
        else return res.sendStatus(404)
    }
    else return res.sendStatus(401)
})

// @desc Changes users profile picture
// @route PUT /users/:userId/changeProfilePicture
router.put(`${route}/:userId/changeProfilePicture`, [authorization, profilePictureUpload.single('profile-picture')], async (req, res) => {
    var userId = req.params.userId
    if (req.user && req.user._id === userId) {
        var user = await User.findOne({
            _id: userId,
        }).exec()
        if (user && req.file) {
            try {
                var oldPicture_id = user.picture_id
                user.picture_id = req.file.id
                await user.save()
                await gridfs.then(gfs => {
                    gfs.remove({ _id: new mongoose.mongo.ObjectId(oldPicture_id) })
                })
                return res.json(user.toObject())
            }
            catch (err) {
                console.log(err)
                res.sendStatus(500)
            }
        }
        else return res.sendStatus(404)
    }
    else return res.sendStatus(401)
})


module.exports = router