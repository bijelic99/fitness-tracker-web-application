const express = require('express')
const router = express.Router()
const route = '/inputs'
const Input = require('../../model/input')

//retrives all inputs of logged in user fails if not logged in
router.get(route, (req, res) => {
    res.send('aaa')
    res.end()
})

//

//adds the input to the mongodb database for the logged in user fails if not logged in
router.post(route, (req, res) => {
    Input.create(req.body).then(input => {
        res.send(input)
    }).catch(err => {
        res.status(400).send({error: err.message})
    })
})

//updates the input fails if not logged in
router.put(`${route}/:id`, (req, res) => {

})

//deletes the input input fails if not logged in
router.delete(`${route}/:id`, (req, res) => {

})

module.exports = router

