var express = require('express');
var router = express.Router();

const auth_controller = require('../controllers/authController');

// POST request for loggin in a user.
router.post('/login', auth_controller.auth_login_post);

// GET protected path
router.get('/protected', auth_controller.protected_get);

module.exports = router;
