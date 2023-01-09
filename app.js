require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const connectDB = require('./db/connect');
const cors = require('cors');
const {isLoggedIn} = require('./middlewares/authentication')
const errorHandlerMiddleware = require('./middlewares/error-handler');

//routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');


//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET))
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/products',isLoggedIn,productRoutes);
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/orders',orderRoutes);
app.use(errorHandlerMiddleware)

app.all('*' , (req,res)=>{
    res.status(404).send('NOT FOUND');
})

//Start-up code
const start = async(url) => {
    try{
        await connectDB(url);
        app.listen(port,()=> console.log(`app is listening at port ${port}`));
    }catch(err){
        console.log(err);
    }
}
start(process.env.MONGO_URI);