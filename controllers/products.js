const Product = require('../models/Product');
const customError = require('../errors');
const catchAsync = require('../Utils/catchAsync')
const {StatusCodes} = require('http-status-codes');


//Getting all products
const getAllProducts = catchAsync(async(req,res) =>{
    const product = await Product.find({});
    res.status(StatusCodes.OK).json({product, len: product.length});
});


//creating a product
const createProduct = catchAsync(async(req,res) =>{
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product});
});


//get single product
const getProduct = catchAsync(async(req,res) => {
    const  {id: productId} = req.params;
    const product = await Product.findOne({_id: productId});
    if(!product) throw new customError.NotFoundError('No such Product Found');
    res.status(StatusCodes.OK).json({product});

});


//update a product
const updateProduct = catchAsync(async(req,res) => {
    const  {id: productId} = req.params;
    const product = await Product.findOneAndUpdate({_id: productId}, req.body,{new:true,runValidators:true});
    if(!product) throw new customError.NotFoundError('No such Product Found');
    res.status(StatusCodes.OK).json({product});
});


//delete a product
const deleteProduct = catchAsync(async(req,res) => {
    const  {id: productId} = req.params;
    const product = await Product.findOneAndDelete({_id: productId});
    if(!product) throw new customError.NotFoundError('No such Product Found');
    res.status(StatusCodes.OK).json({
        status: "Success",
        message:`Deleted the product with id ${product._id}`
    });
});

module.exports = {getAllProducts,getProduct,createProduct,updateProduct,deleteProduct};
