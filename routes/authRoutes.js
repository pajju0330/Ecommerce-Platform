const express = require('express');
const router = express.Router();

const {signup,login,logout} = require('../controllers/auth');

//setting the routes
router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/logout').get(logout);

module.exports = router;