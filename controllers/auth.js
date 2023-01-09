const customError = require('../errors');
const {StatusCodes} = require('http-status-codes');
const Auth = require('../models/Auth');
const {tokenCookie} = require('../Utils/createToken');
const catchAsync = require('../Utils/catchAsync')

//signup
const signup = catchAsync(async(req,res) => {
    const {email,password,username} = req.body;
    if(!email || ! password) throw new customError.BadRequestError('Please provide email and password');
    const userExists = await  Auth.findOne({email});
    if(userExists) throw new customError.BadRequestError('User already exists with this email');
    const isFirstAccount = (await Auth.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const user = await Auth.create({email,password,username,role});
    const token =  tokenCookie(user,res);
    res.status(StatusCodes.CREATED).json({ token,user });
});


//login
const login = catchAsync(async(req,res) => {
    const {email,password} = req.body;
    if(!email || ! password) throw new customError.BadRequestError('Please provide email and password',401);
    const user = await  Auth.findOne({email});
    if(!user) throw new customError.UnauthenticatedError('incorrect email or password');
    if(!user.passwordCheck(password)) throw new customError.UnauthenticatedError('incorrect email or password',401);
    const token =  tokenCookie(user,res);
    res.status(StatusCodes.OK).json({ token,user });

});


//logout
const logout = catchAsync(async(req,res) => {
    res.cookie('jwt', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
      res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
});




module.exports = {signup,login,logout}
