const { Router } = require('express');
const { adminRegister } = require('../../controller/admin-controller/adminRegister')
const { adminLogin, refreshController, deleteRefreshToken } = require('../../controller/admin-controller/adminAuth')
const { verifyToken } = require('../../middleware/verifyToken')
const { verifyRole } = require('../../middleware/verifyRole')
const router = Router();


// after login routes for admin view
router.get('/dashboard', verifyToken, verifyRole, (req, res) => {
    res.send('admin view op')
});

// routes related to auth
router.post('/register', adminRegister);
router.post('/login', adminLogin);
// refresh routes
router.get('/refresh', refreshController);
router.delete('/refresh', deleteRefreshToken);


module.exports = router