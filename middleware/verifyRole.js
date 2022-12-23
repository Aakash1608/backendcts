const pool = require('../model/db')
const { searchUserQuery } = require('../model/query')

const verifyRole = async(req, res, next) => {
    try {
        console.log(req.user);
        const role = req.user.roles;
        console.log(role)
        if(role != process.env.ADMIN_ROLE){ 
            return res.status(401).json({ msg: "Only Admin can make request" })
        }
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    verifyRole
}