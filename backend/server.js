
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import profileRouter from './routes/profileRoute.js';


const app = express();
const port = process.env.PORT || 4000;


// Connect to the database and cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());


// Mount routes
app.use('/api/user', userRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/profile', profileRouter);



app.get('/', (req, res) => {
    res.send('API working');
});
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
