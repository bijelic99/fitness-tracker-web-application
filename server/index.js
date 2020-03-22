require('dotenv/config')
require('./mongooseSetup')
const express = require('express')
const bodyParser = require('body-parser')


//app setup
const app = express()

app.use(bodyParser.json())

//Setting up routes
app.use('/api', require('./controller/api/posts'))
app.use('/api', require('./controller/api/users'))
app.use('/api', require('./controller/api/inputs'))

app.listen(process.env.port || 5000,() => {
    console.log('Server is up')
})
