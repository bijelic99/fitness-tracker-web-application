const express = require('express')
const ExerciseType = require('../../model/exerciseType')
const route = '/exercise-types'

const router = express.Router()

// @desc adds sent exercise type to the database
// @route POST /api/exercise-types
//perhaps there should be auth required on this route, but for ease of access its without it
router.post(route,  async (req, res) => {
    try {
        var exerciseType = new ExerciseType({
            exercise_name: req.body.exercise_name
        })
        return res.json(await exerciseType.save())
    }
    catch{
        return res.sendStatus(500)
    }
})

// @desc gets exercise types from the database
// @route GET /api/exercise-types
router.get(route, async (req, res)=>{
    try{
        return res.json(await ExerciseType.find({}).lean().exec())
    }
    catch{
        console.log('adasd')
        return res.sendStatus(500)
    }
})

module.exports = router