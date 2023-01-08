const express = require('express'); 
const router = express.Router();

const {isAuthroized,isLoggedIn} = require('../middlewares/authentication');
const { getAllOrders,getMyOrders,getSingleOrder,cancelOrder,createOrder } = require('../controllers/order');


router.route('/user').get(isLoggedIn, getMyOrders).post(isLoggedIn,createOrder).delete(isLoggedIn,cancelOrder); 
router.route('/:id').get(isLoggedIn,isAuthroized('admin'),getSingleOrder)
router.route('/').get(isLoggedIn,isAuthroized('admin'),getAllOrders)

module.exports = router;