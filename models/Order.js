const mongoose = require('mongoose');   

const singleOrderSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    product:{
        type: mongoose.Schema.ObjectId,
        ref:'Product',
        required:true,
    },
});

const orderSchema = new mongoose.Schema({
    shippingFee:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    },
    orderedItems: [singleOrderSchema],
    status:{
        type:String,
        enum: ['pending' , 'failed' , 'paid', 'delivered' , 'canceled'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },

},{ timestamps: true })

module.exports = mongoose.model('Order' , orderSchema);