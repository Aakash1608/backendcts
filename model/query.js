const createAdminQuery = "INSERT INTO users(id, password, roles) VALUES ($1, $2, $3)";
const searchUserQuery = "SELECT * FROM users WHERE id = $1";

module.exports = {
    createAdminQuery,
    searchUserQuery
}