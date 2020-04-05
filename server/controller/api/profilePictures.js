const express = require('express')
const router = express.Router()
const { gridfs } = require('../../middleware/profilePictureUploadMiddleware')
const mongoose = require('mongoose')
const sharp = require('sharp')

//retrieves the profile picture in desired width/height, contains the image
router.get('/profile-pictures/:picture_id/:width/:height', (req, res) => {
    try {
        var width = parseInt(req.params.width)
        var height = parseInt(req.params.height)
        gridfs.then(gfs => {
            gfs.files.findOne({
                _id: new mongoose.mongo.ObjectId(req.params.picture_id)
            }, async (err, file) => {

                if (!file || file.length === 0) {
                    return res.status(404).json({
                        err: 'No file'
                    })
                }

                var readStream = gfs.createReadStream(file.filename)
                var imageResize = sharp().resize({
                    width: width,
                    height: height,
                    fit: sharp.fit.contain,
                    background: {r:0, g:0, b:0, alpha: 0}
                }).png()
                readStream.pipe(imageResize).pipe(res)

            })
        })

    } catch (error) {
        return res.status(404).json(error)
    }
})

module.exports = router