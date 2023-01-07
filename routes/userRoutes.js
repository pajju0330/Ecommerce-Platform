const express = require('express');
const router = express.Router();

//requiring controllers and middlewares
const { getAllUsers, getSingleUser, updateUserPassword, updateName, updateEmail, deleteUser } = require('../controllers/users');
const { isLoggedIn, isAuthroized } = require('../middlewares/authentication');


//setting up the routes for user
router.route('/user/changepassword').get(isLoggedIn,updateUserPassword);
router.route('/user/changename').get(isLoggedIn,updateName);
router.route('/user/changemail').get(isLoggedIn,updateEmail);


//setting up the routes for Admin
router.route('/:id').get(isLoggedIn,isAuthroized('admin'),getSingleUser);
router.route('/').get(isLoggedIn,isAuthroized('admin'),getAllUsers);



module.exports = router;