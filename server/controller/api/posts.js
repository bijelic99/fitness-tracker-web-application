const express = require('express')
const router = express.Router()
const route = '/posts'

router.get(route, (req, res)=>{
    res.send("aaaaaaaa")
    res.end()
})


module.exports = router

