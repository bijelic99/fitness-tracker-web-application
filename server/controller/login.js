//login controler

//imports
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()
const route = '/login'

const User = require('../model/user')

const errorMessage = "Email or password are invalid"

//logs in user 
router.post(route, async (req, res) => {

    //finds the user with given username or email
    //if not valid returns error
    const user = await User.findOne({
        $or: [{
            username: req.body.username
        },
        {
            email: req.body.email
        }]
    }).exec().then(doc => doc.toObject())

    //checks password with hashed pwd stored in db
    const validPassword = await bcrypt.compare(req.body.password, await user.password)

    //if not valid returns error
    if (!validPassword) return res.status(400).send({ error: errorMessage })

    //creates a token for user to use in the future
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)

    //adds the token to the header
    res.header('auth-token', token)

    //sends the token back as well as user data
    return res.send({ user: user, token: token })


})

module.exports = router