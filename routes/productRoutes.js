const express = require('express');
const router = express.Router();

const {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct} = require('../controllers/products');

//setting the routes
router.route('/').post(createProduct).get(getAllProducts);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;