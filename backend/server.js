import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';


import connectCloudinary from './config/cloudinary.js';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import profileRouter from './routes/profileRoute.js';
import newsletterRouter from './routes/newsletterRoute.js';
import reviewRouter from './routes/reviewRoutes.js';
import returnRouter from './routes/returnRoute.js';
import recommenderRouter from './routes/recommenderRoute.js';


const app = express();
const port = process.env.PORT || 4000;

// Connect to the database and cloudinary
connectDB();
connectCloudinary();



// Middleware
app.use(express.json());

// Updated CORS Configuration
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']; 
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, 
}));

app.use(cookieParser());

// Mount routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/profile', profileRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/return', returnRouter);
app.use('/api/recommender', recommenderRouter);


app.get('/', (req, res) => {
    res.send('API working');
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
