const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/registrationController');
const authMW  = require('../middleware/authMiddleware');

// require login
router.use(authMW);

router.post( '/',        ctrl.register);
router.get(  '/mine',    ctrl.getMine);

module.exports = router;
