const Order = require('../models/Order');
const Product = require('../models/Product');
const customError = require('../errors');
const {StatusCodes} = require('http-status-codes');

const createOrder = async(req,res) => {
    const { items: cartItems, shippingFee} = req.body;
    if(!cartItems || cartItems.length < 1) throw new customError.BadRequestError('No items to place order');
    if(!shippingFee) throw new customError.BadRequestError('Please provide shipping fee');

    let orderItems = [];
    let subTotal = [];
    for(const item of cartItems){
        const dbProduct = await Product.findOne({_id: item.product});
        if(!dbProduct) throw new customError.NotFoundError(`No item with id ${item.product}`);
        const { name, price, imageURL, _id} = dbProduct;
        const singleOrderItem = {
            quantity: item.quantity,
            name, price, imageURL,
            product: _id
        };
        orderItems = [...orderItems,singleOrderItem];
        subTotal += item.quantity*price;
    }
    const total = shippingFee + subTotal;
    const paymentIntent = awai
}


