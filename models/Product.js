const mongoose = require('mongoose');   

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:100,
    },
    imageURL:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    brand:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['MEN','WOMEN', 'KIDS'],
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    freeShipping:{
        type:Boolean,
        default:false,
    },
    featured:{
        type:Boolean,
        default:false,
    }
}) 

module.exports = mongoose.model('Product', productSchema);