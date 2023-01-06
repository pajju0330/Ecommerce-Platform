const jwt = require('jsonwebtoken');

const createToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
}

const isValidToken = ({ token }) => jwt.verify(token,process.env.JWT_SECRET);

const tokenCookie = (user,res)=>{
    const token = createToken(user._id);
    let cookieOptions = {  
        expires: new Date(Date.now() + 1000*    24*60*60),
        httpOnly: true,
        signed:true,
        secure: process.env.NODE_ENV === 'production'
     }
    res.cookie('jwt',token,cookieOptions);
    return token;
}

module.exports = {tokenCookie,createToken,isValidToken};