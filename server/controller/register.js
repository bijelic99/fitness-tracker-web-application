//module for registering new users
const express = require('express')
const router = express.Router()
const route = '/register'
const User = require('../model/user')
const Joi = require('@hapi/joi')
const UserValidationSchema = require('../validation/userModelValidation')

//registers a new user
router.post(route, async (req, res) => {

    //validating the data before adding it to the database
    const { error } = UserValidationSchema.validate(req.body)
    if (error) {
        res.status(400).send({ error: error.details[0].message })
        return
    }
    else {

        //checks to see if email or username are taken
        var query = User.findOne({
            $or: [{
                email: req.body.email
            },
            {
                username: req.body.username
            }]
        }).exec()
        
        if (await query) {
            res.status(400).send({ error: 'Email or username are taken' })
            return
        }

        //if there are no errors we add new user to the database
        const user = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            picture: req.body.picture
        })
        user.save().then(() => {
            res.send({ successful: true })
        }).catch(err => {
            //if insertion is unsuccessful we send the error back to the client
            res.status(400).send({ error: err })
        })
    }

})

module.exports = router