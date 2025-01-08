const express = require('express');
const router = express.Router();
const GeneralSecurityMiddleware = require('../middlewares/general-security-middleware');
const AuthController = require('../controllers/auth-controller');
const UserController = require('../controllers/user-controller');


router.post('/auth/token', AuthController.handleLogin);
router.post('/user', UserController.handlePostUser);


router.use(GeneralSecurityMiddleware.authenticateRequestWithJwtToken);

router.get('/users', UserController.handleGetAllUser);
router.get('/user', UserController.handleGetUser);
router.put('/user', UserController.handleUpdateUser);
router.delete('/user', UserController.handleDeleteUser);

module.exports = router;