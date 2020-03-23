//backend validation for input model
const Joi = require('@hapi/joi')

const inputValidationSchema = Joi.object().keys({
    type: Joi.string().required()
    name: Joi.string().max(255).required()
    value: Joi.number().required()
})

module.exports = inputValidationSchema