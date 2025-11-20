import reviewModel from '../models/reviewModel.js';
import productModel from '../models/productModel.js';

// Add a review
const updateProductRating = async (productId) => {
  const reviews = await reviewModel.find({ productId });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const ratingCount = reviews.length;

  if (ratingCount > 0) {
    const averageRating = totalRating / ratingCount;
    await productModel.findByIdAndUpdate(productId, {
      'ratings.totalRating': totalRating,
      'ratings.ratingCount': ratingCount,
      'ratings.averageRating': averageRating.toFixed(1),
    });
  }
};

// Modified addReview function
export const addReview = async (req, res) => {
  try {
    const { productId, comment, rating } = req.body;

    if (!productId || !comment || !rating || !req.body.userId) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    let review = await reviewModel.findOne({ productId, userId: req.body.userId });

    if (review) {
      review.comment = comment;
      review.rating = rating;
      await review.save();
    } else {
      review = new reviewModel({ productId, userId: req.body.userId, comment, rating });
      await review.save();
    }

    // Update product rating
    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      message: 'Review added successfully.',
      review,
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await reviewModel.find({ productId }).populate('userId', 'name email');
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
