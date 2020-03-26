//Used for adding new inputs to the db, user needs to be authorized to access
//imports
const express = require('express')
const router = express.Router()


const Input = require('../../model/input')

const authorization = require('../../middleware/authorization')

const route = '/inputs'

//for user to be able to add an input he needs to be logged in first
//delete comment below later to add authorization
//router.use(route, authorization)

router.post(route, async (req, res)=>{
    //adds the input in coresponding db tables
    //after that adds the entry to inputs table
    var item = req.body
    if(item.type === "FoodInput") {
        var Food = require('../../model/food')
        var newFoodInput = new Food(req.body.input_data)
        var { _id } = await newFoodInput.save()
        item.input_data_id = _id
    }
    else if(item.type === "ExcerciseInput"){
        var Excercise = require('../../model/excercise')
        var newExerciseInput = new Excercise(req.body.input_data)
        var { _id } = await newExerciseInput.save()
        item.input_data_id = _id
    }
    else if(item.type === "BmiInput"){
        var Bmi = require('../../model/excercise')
        var newBmiInput = new Bmi(req.body.input_data)
        var { _id } = await newBmiInput.save()
        item.input_data_id = _id
    }

    var input = new Input({
        user_id: item.user_id,
        type: item.type,
        name: item.name,
        value: item.value,
        input_data_id: item.input_data_id
    }) 
    res.json(await input.save())

})








module.exports = router

