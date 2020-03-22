//module for registering new users
const express = require('express')
const router = express.Router()
const route = '/register'
const User = require('../model/user')

//registers a new user
router.post(route, (req, res)=>{
    res.send("aaaaaaaab")
    res.end()
})

module.exports = router