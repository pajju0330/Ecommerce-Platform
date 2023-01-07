const mongoose = require('mongoose');   
const validator = require('validator');
const bcrypt = require('bcrypt');
const AuthSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    name:{
        type:String,
    },
    img:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        minLength: [8,'Password should have a minimum length of 8']
    },
    confirmPassword:{
        type:String,
        validate: {
            validator: function(e){
                return e === this.password;
            },
            message: 'please match the password'
            
        }
    },
    role:{
        type:String,
        enum: ['admin' , 'user'],
        default: 'user'
    }
});

/* || methods and attributes* || */

AuthSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10);
    this.confirmPassword = undefined;
    next();
})

AuthSchema.methods.passwordCheck = async function(candidatePass){
    return await bcrypt.compare(candidatePass,this.password);
}

module.exports = mongoose.model('Auth', AuthSchema);