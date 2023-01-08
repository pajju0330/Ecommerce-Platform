const Order = require('../models/Order');
const Product = require('../models/Product');
const customError = require('../errors');
const {StatusCodes} = require('http-status-codes');

const createOrder = async(req,res) => {
    const { items: cartItems, shippingFee} = req.body;
    if(!cartItems || cartItems.length < 1) throw new customError.BadRequestError('No items to place order');
    if(!shippingFee) throw new customError.BadRequestError('Please provide shipping fee');
    let orderedItems = [];
    let subTotal = 0;
    for(const item of cartItems){
        const dbProduct = await Product.findOne({_id: item.product});
        if(!dbProduct) throw new customError.NotFoundError(`No item with id ${item.product}`);
        const { name, price, _id , imageURL} = dbProduct;
        const singleOrderItem = {
            quantity: item.quantity,
            name, price,
            image:imageURL,
            product:_id
        };
        orderedItems = [...orderedItems,singleOrderItem];
        subTotal += item.quantity*price;
    }
    const total = shippingFee + subTotal;
    const order = await Order.create({
        orderedItems,
        total,
        shippingFee,
        user: req.user._id,
    });
    res.status(StatusCodes.CREATED).json({ order });
}

const getAllOrders = async(req,res) =>{
    const order = await Order.find({});
    res.status(StatusCodes.OK).json({length:order.length, order });
}


const getSingleOrder = async(req,res) =>{
    const id = req.params.id;
    const order = await Order.findOne({_id:id});
    if(!order) throw new customError.NotFoundError(`No order with id ${id}`);
    res.status(StatusCodes.OK).json({ order });
}


const getMyOrders = async(req,res) =>{
    const order = await Order.findOne({user:req.user});
    if(!order) throw new customError.NotFoundError('No orders for this user');
    res.status(StatusCodes.OK).json({length:order.orderedItems.length, order });
}


const cancelOrder = async(req,res) =>{
    const order = await Order.deleteMany({});
    req.status(StatusCodes.OK).json({message: 'Cancelled all the order'});
}


module.exports = { getAllOrders,getMyOrders,getSingleOrder,cancelOrder,createOrder };
