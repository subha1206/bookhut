const router = require('express').Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.patch(
  '/update-me',
  authController.protectedRoute,
  userController.updateMe
);

router.post(
  '/upload-photo',
  authController.protectedRoute,
  userController.upload,
  userController.uploadUserPhoto
);

module.exports = router;
