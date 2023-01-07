const Auth=require('../models/Auth');
const customError=require('../errors');
const {StatusCodes}=require('http-status-codes');


//multer
const multer = require('multer');  

const multerStorage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'./uploads/');
    },
    filename:(req,file,cb) =>{
        const ext = file.mimetype.split('/')[1];
        cb(null,`user-${req.user._id}-${Date.now()}.${ext}`);
    }
});
const multerFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
    else{
        cb(null,);
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadSettings = upload.single('image');

//Getting all Users
const getAllUsers = async(req,res)=>{
    const user=await Auth.find({role:'user'}).select('-password');
    res.status(StatusCodes.OK).json({user}); 
}


//Getting single user [User Account]
const getSingleUser = async(req,res)=>{
    const user=await Auth.findOne({_id:req.params.id}).select('-password');
    if(!user) throw new customError.NotFoundError(`No user with id ${id}`);
    res.status(StatusCodes.OK).json({user});
}


//Updating user password
const updateUserPassword = async(req,res)=>{
    console.log('req');
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword) throw new customError.BadRequestError(`Old password or new password is missing`);
    const user = await Auth.findOne({_id:req.user._id});
    user.password=newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({message:'Succesfully changed password!'});
}


//Updating user name
const updateName = async(req,res)=>{
    const {newName}=req.body;
    if(!newName) throw new customError.BadRequestError('Please provide a name');
    const user=await Auth.findOne({_id:req.user._id});
    user.name = newName;
    await user.save();
    res.status(StatusCodes.OK).json({ user });
}


//Updating user email
const updateEmail = async(req,res)=>{
    const {newEmail}=req.body;
    if(!newEmail) throw new customError.BadRequestError('Please provide an email');
    const user=await Auth.findOne({_id:req.user._id});
    user.email=newEmail;
    await user.save();
    res.status(StatusCodes.OK).json({user});
}


//deleting a user
const deleteUser = async(req,res)=>{
    const user = await Auth.findOneAndDelete({_id:req.user._id});
    res.status(StatusCodes.OK).json({message: 'Deleted the user!'});
}


//adding image

const addImage = async(req,res)=>{
    const img = req.file;
    if(!img) throw new customError.BadRequestError('PLease input a file to be uploaded');
    const user = await Auth.findOne({_id:req.user._id});
    user.img = img.filename;
    await user.save();
    res.status(StatusCodes.OK).json({message: 'Uploaded the photo'});

}

module.exports = {getAllUsers,getSingleUser,updateUserPassword,updateName,updateEmail,deleteUser,addImage,uploadSettings};