const mongoose = require('mongoose')
const connection = require('../data-access/mongooseSetup')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const crypto = require('crypto')
const path = require('path')


const collectionName = 'profilePictureUploads'

const gfs = connection.then(conn=>{
    var grid = Grid(conn.db, mongoose.mongo)
    grid.collection(collectionName)
    return grid
}).catch(err=>{
    console.error ("GridFS init error ")
    console.error(err.message)
    return null
})

const storage = new GridFsStorage({
    url: process.env.DATABASE_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf)=>{
                if(err) return reject(err)
                const filename = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    filename: filename,
                    bucketName: collectionName
                }
                resolve(fileInfo)
            })
        })
    }

})

const upload = multer({ storage })

module.exports = {
    profilePictureUpload: upload,
    gridfs: gfs
}
