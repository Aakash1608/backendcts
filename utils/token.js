const jwt = require('jsonwebtoken');

const generateAccessToken = ({ id, roles }) => {
    const payload = { id, roles };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
    return accessToken
}
const generateRefreshToken = ({ id, roles }) => {
    const payload = { id, roles };
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '5m' });
    return refreshToken
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}