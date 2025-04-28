const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/eventController');
const authMW  = require('../middleware/authMiddleware');

// all event routes require authentication
router.use(authMW);

router.get( '/',       ctrl.getAll);
router.get( '/:id',    ctrl.getOne);
router.post('/',       ctrl.create);
router.put( '/:id',    ctrl.update);

module.exports = router;
