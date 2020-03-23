//backend validation for post model
const Joi = require('@hapi/joi')

const postValidationSchema = Joi.object().keys({
    title: Joi.string().max(255).required(),
    text: Joi.string().max(1024).required(),
    input: Joi.object(),
    visibility: Joi.string().required()
})

module.exports = postValidationSchema