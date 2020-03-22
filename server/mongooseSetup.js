const mongoose = require('mongoose')

//connecting to database
//the url link is env variable and should be in .env file under the name of DATABASE_URL
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connection established"))
    .catch(err => console.error(err.message))

mongoose.Promise = global.Promise