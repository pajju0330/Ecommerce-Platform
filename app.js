require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const connectDB = require('./db/connect');
const {isLoggedIn} = require('./middlewares/authentication')
const errorHandlerMiddleware = require('./middlewares/error-handler');

//routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');



app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/products',isLoggedIn,productRoutes);
app.use(errorHandlerMiddleware)


const start = async(url) => {
    try{
        await connectDB(url);
        app.listen(port,()=> console.log(`app is listening at port ${port}`));
    }catch(err){
        console.log(err);
    }
}
start(process.env.MONGO_URI);