const express = require('express')
const router = express.Router()
const route = '/users'
const User = require('../../model/user')

//retrives all users
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

module.exports = router