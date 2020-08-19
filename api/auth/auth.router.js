const { Router } = require('express');
const router = Router();
const authController = require('./auth.controller');

// const UserController = require('../user/user.controller');
// const AuthController = require('./auth.controller');
// const { tokenMiddleware } = require('../../middleware/auth.middleware');
// const { RegValidateMiddleware } = require('./auth.validator');

// authRouter.get('/current', tokenMiddleware, AuthController.getCurrentUser);
router.post('/register', authController.registerUser);
router.get('/verify/:verificationToken', authController.verifyEmail);

exports.authRouter = router;
