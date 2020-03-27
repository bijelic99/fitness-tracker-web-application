require('dotenv/config')
require('./data-access/mongooseSetup')
const express = require('express')
const bodyParser = require('body-parser')


//app setup
const app = express()

app.use(bodyParser.json())

//Setting up routes
app.use('/api', require('./controller/api/posts'))
app.use('/api', require('./controller/api/users'))
app.use('/api', require('./controller/api/inputs'))
app.use('/', require('./controller/register'))
app.use('/', require('./controller/login'))

app.listen(process.env.port || 5000,() => {
    console.log('Server is up')
})
