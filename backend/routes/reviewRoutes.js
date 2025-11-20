import express from 'express';
import { addReview, getProductReviews } from '../controllers/reviewController.js';
import authUser from '../middleware/Auth.js';

const reviewRouter = express.Router();

// Route to add a review
reviewRouter.post('/add', authUser, addReview);

// Route to get reviews for a product
reviewRouter.get('/:productId', authUser, getProductReviews);

export default reviewRouter;
