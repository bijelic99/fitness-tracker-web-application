//module for login
const express = require('express')
const router = express.Router()
const route = '/login'
const User = require('../model/user')

//logs in user 
router.post(route, (req, res)=>{
    res.send("aaaaaaaab")
    res.end()
})

module.exports = router