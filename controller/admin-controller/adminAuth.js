const jwt = require('jsonwebtoken');
const pg = require('pg');
const bcrypt = require('bcrypt');
const pool = require('../../model/db');
const { searchUserQuery } = require('../../model/query');
const { generateAccessToken, generateRefreshToken } = require('../../utils/token');


const adminLogin = async (req, res) => {
    try {
        const { id, password } = req.body;
        if(!id || !password) return res.status(400).json({ msg: "Both id nd password must be provided" })
        const user = await pool.query(searchUserQuery, [id]);
        if(user.rows.length === 0){
            return res.status(404).json({ msg: "No Such User" })
        }
        const userMatch = await bcrypt.compare(password, user.rows[0].password);
        if(!userMatch) return res.status(401).json({ msg: "Password doesn't match" });
        const roles = user.rows[0].roles;
        const accessToken = generateAccessToken({ id, roles });
        const refreshToken = generateRefreshToken({ id, roles });
        res.cookie('refresh_token', refreshToken, { httpOnly: true });
        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const refreshController = (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if(!refreshToken) return res.status(400).json({ error: "No refresh Token" })
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if(error) return res.status(401).json({error: error.message})
        const { id, roles } = user;
        const accessToken = generateAccessToken({ id, roles })
        res.status(200).json({ accessToken })
    })
}
const deleteRefreshToken = (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({ msg: "Refresh Token deleted" })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

module.exports = { adminLogin, refreshController, deleteRefreshToken }