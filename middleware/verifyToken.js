
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // auth header
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(400).json({ msg: "No token sent" });
    console.log(req.user, " User of req")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) return res.status(401).json({ error: error.message })
        console.log(user)
        req.user = user;
        next()
    })
}

module.exports = { verifyToken }