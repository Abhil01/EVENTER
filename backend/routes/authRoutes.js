const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/authController');
const authMW  = require('../middleware/authMiddleware');

router.post('/register', ctrl.register);
router.post('/login',    ctrl.login);
router.post('/logout',   ctrl.logout);
router.get( '/me', authMW, ctrl.me);

module.exports = router;
