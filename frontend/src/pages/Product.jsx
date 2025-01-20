import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import StarRating from "../components/StarRating";
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendUrl, userData,wishlist, addToWishlist, removeFromWishlist } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [rating, setRating] = useState(0); // Default value set to 0
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState(''); // Default value set to an empty string
  const token = Cookies.get('token');

  // Fetch product data
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        const savedRating = localStorage.getItem(`rating-${productId}`);
        setRating(savedRating ? Number(savedRating) : item.ratings?.rating || 0);
        return null;
      }
    });
  };

  // Fetch product reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/reviews/${productId}`);
      if (response.data.success) {
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleRatingSubmit = async (newRating) => {
    setRating(newRating);
    localStorage.setItem(`rating-${productId}`, newRating);

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/rating`,
        {
          productId: productData._id,
          rating: newRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success('Rating submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Failed to submit rating.');
    }
  };

  const handleReviewSubmit = async () => {
    try {
      if (!comment.trim() || !rating) {
        toast.error('Please fill in all fields.');
        return;
      }

      const reviewData = { productId, comment, rating, userData };

      const response = await axios.post(
        `${backendUrl}/api/reviews/add`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Review submitted successfully!');
        setReviews((prev) => [...prev, response.data.review]);
        localStorage.setItem(`reviews-${productId}`, JSON.stringify([...reviews, reviewData]));
        setComment('');
        setRating(0);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review.');
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(productData._id);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(productData._id);
    toast.success("Removed from wishlist!");
  };
  

  const isInWishlist = wishlist.some(item => item._id === productData._id);

  useEffect(() => {
    fetchProductData();
    fetchReviews();
  }, [productId, products]);

  const averageRating =
    productData && productData.ratings && productData.ratings.ratingCount
      ? (productData.ratings.totalRating / productData.ratings.ratingCount).toFixed(1)
      : "No ratings yet";

  return productData && productData._id ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[14%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-96" src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="mt-4">
            <StarRating onRatingSubmit={handleRatingSubmit} currentRating={rating} />
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 rounded-lg ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Wishlist Button */}
          <div className="mt-4 flex gap-2">
          {/* <button className="bg-orange-500 py-3 px-8 text-white rounded-lg mt-4 hover:bg-orange-600 transition-colors" onClick={() => addToWishlist(productData._id)}>Add to Wishlist</button> */}
          {isInWishlist ? (
    <button
      className="bg-red-500 py-3 px-8 text-white rounded-lg mt-4 hover:bg-red-600 transition-colors"
      onClick={handleRemoveFromWishlist}
    >
      Remove from Wishlist
    </button>
  ) : (
    <button
      className="bg-orange-500 py-3 px-8 text-white rounded-lg mt-4 hover:bg-orange-600 transition-colors"
      onClick={handleAddToWishlist}
    >
      Add to Wishlist
    </button>
  )}
          <div className='gap-3'>
            <button
              onClick={() => addToCart(productData._id, size)}
              className="bg-orange-500 py-3 px-8 text-white rounded-lg mt-4 hover:bg-orange-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-medium mb-4">Reviews</h2>
        <div className="flex flex-col gap-6">
          {reviews.length ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-sm flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <StarRating currentRating={review.rating} readOnly />
                  <span className="text-gray-500 text-sm">({review.rating})</span>
                </div>
                <p>{review.comment}</p>
                <span className="text-gray-400 text-sm">
                  — {review.userdata || 'Anonymous'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet. Be the first to leave one!</p>
          )}
        </div>

        <div className="mt-8">
  <h3 className="text-xl font-medium mb-4">Leave a Review</h3>
  <div className="flex flex-col gap-4">
    {/* Textarea for Review Comment */}
    <textarea
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      placeholder="Write your review here..."
      className="border rounded-md p-4 w-full"
    ></textarea>

    {/* Star Rating Component for Individual Ratings */}
    <div className="flex items-center gap-2">
      <StarRating
        currentRating={rating}
        onRatingSubmit={(newRating) => setRating(newRating)}
      />
      <span className="text-gray-500 text-sm">
        {rating ? `Your Rating: ${rating} stars` : 'Please select a rating'}
      </span>
    </div>

    {/* Submit Button */}
    <button
      className="bg-orange-500 text-white py-2 px-6 rounded-md"
      onClick={handleReviewSubmit}
    >
      Submit Review
    </button>
  </div>
</div>

      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <RelatedProducts currentProduct={productData} />
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-600 py-20">Loading products...</div>
  );
};

export default Product;
