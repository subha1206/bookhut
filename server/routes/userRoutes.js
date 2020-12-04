const router = require('express').Router();
// import userController from '../controllers/userController';
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
