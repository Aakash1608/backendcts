const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../../model/db');
const { createAdminQuery } = require('../../model/query');
const { searchUserQuery } = require('../../model/query');


const adminRegister = async(req, res) => {
    try{
        const { id, password } = req.body;
        const roles = 2716;
        if(!id || !password) {
            res.status(400).json({ msg: "All the fields are mandatory" });
        }
        const hashPwd = await bcrypt.hash(password, 10)
        const values = [id, hashPwd, roles];
        const result = await pool.query(searchUserQuery, [id]);
        if(result.rows.length !== 0){
            return res.status(400).json({ msg: "User Already Exists" });
        }
        await pool.query(createAdminQuery, values);
        res.status(201).json({ msg: `Super User - ${id} Created` });
    }catch(error){
        console.log(error.message)
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    adminRegister
}