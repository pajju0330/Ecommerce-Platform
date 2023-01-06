const express = require('express'); 
const router = express.Router();

const {isAuthroized,isLoggedIn} = require('../middlewares/authentication');
const { route } = require('./authRoutes');

router.route('/').post(isLoggedIn,createOrder).get(isLoggedIn,isAuthroized('admin'),getAllOrders);

module.exports = route;