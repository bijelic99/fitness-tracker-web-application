const express = require('express')
const router = express.Router()
const route = '/users'
const User = require('../../model/user')
const { gridfs } = require('../../middleware/profilePictureUploadMiddleware')
const moongose = require('mongoose')
const fs = require('fs')

// @desc Retrieves all users
// @route GET /users
router.get(route, (req, res)=>{

    res.send("aaaaaaaab")
    res.end()
})

router.post(route, (req, res)=>{
    res.send("aaaaaaaab")
    res.end()
})

router.put(`${route}/:id`, (req, res)=>{
    res.send("aaaaaaaab")
    res.end()
})

router.delete(`${route}/:id`, (req, res)=>{
    res.send("aaaaaaaab")
    res.end()
})

// @desc Retrieves profile picture
// @route GET /users/profilePicture/:pictureId
router.get(`${route}/profilePicture/:picture_id`, (req, res)=>{
    gridfs.then(gfs=>{
        gfs.files.findOne({
            _id: new moongose.mongo.ObjectId( req.params.picture_id )
        }, (err, file)=>{
            if(!file || file.length === 0){
                return res.status(404).json({
                    err: 'No file'
                })
            }
    
            if(/^image\//.test(file.contentType)){
                const readstream = gfs.createReadStream(file.filename)
                readstream.pipe(res)
            }
            else{
                res.status(404).send("format not supported")
            }
        })

    }).catch(err=>res.send(err.message))
})

module.exports = router