//Middleware used for access control

//imports
const jwt = require('jsonwebtoken')


//checks if user has a valid token, if not denies him the service
module.exports = function(req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send({error: 'Access denied'})
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
    } catch (err) {
        req.status(400).send('Invalid token')
    }
}