const mongoose = require('mongoose')

//registering models
require('../model/bmi')
require('../model/exercise')
require('../model/food')
require('../model/input')
require('../model/friendRequest')
require('../model/friendship')
require('../model/post')
require('../model/user')
require('../model/exerciseType')

//connecting to database
//the url link is env variable and should be in .env file under the name of DATABASE_URL
const connection = mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(({ connection }) => {
        console.log("Connection established")
        return connection
    })
    .catch(err => {
        console.error(err.message)
        return null
    })

mongoose.Promise = global.Promise



module.exports = connection