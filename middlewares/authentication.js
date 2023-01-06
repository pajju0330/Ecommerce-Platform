const customError = require('../errors');
const {isValidToken} = require('../Utils/createToken');

const isLoggedIn = async(req,res,next) =>{
    const token = req.signedCookies.jwt;
    if(!token) throw new customError.UnauthenticatedError('You are not logged in');
    try{
        const {id} = isValidToken({token});
        next();
    }catch(err){
        throw new customError.UnauthenticatedError('You are not logged in');
    }
};

const isAuthroized = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new CustomError.UnauthorizedError('Unauthorized to access this route');
        };
        next();
    };
};

module.exports = {isAuthroized,isLoggedIn};