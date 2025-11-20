import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';
import reviewModel from '../models/reviewModel.js';

// Function for adding a product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
    const isBestseller = bestseller === 'true';

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subcategory,
      bestseller: isBestseller,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: 'Product added successfully' });

    const reviews = await reviewModel.find({productId: product._Id});
    if (reviews.length > 0){
      const totalRating = reviews.reduce((acc, reviews) => acc + reviews.rating, 0);
      const averageRating = totalRating / reviews.length;
      product.rating = averageRating;
      await product.save();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for listing products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for removing a product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for getting a single product's info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
    const reviews = await reviewModel.find({productId}).populate("userId", "username email");
    res.status(200).send(product,reviews )
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function for editing a product
const editProduct = async (req, res) => {
  try {
    const { id, name, category, price } = req.body;

    if (!id || !name || !category || !price) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, category, price },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully.',
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const addRating = async (req, res) => {
  try {
    const { productId, rating } = req.body;

    if (!productId || !rating) {
      return res.status(400).json({ success: false, message: "Product ID and rating are required." });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    // Validate and normalize rating
    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ success: false, message: "Rating must be a number between 1 and 5." });
    }

    // Update ratings
    product.ratings.totalRating += numericRating;
    product.ratings.ratingCount += 1;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Rating added successfully.",
      ratings: {
        totalRating: product.ratings.totalRating,
        ratingCount: product.ratings.ratingCount,
        averageRating: (product.ratings.totalRating / product.ratings.ratingCount).toFixed(2),
      },
    });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


export { listProducts, addProduct, removeProduct, singleProduct, editProduct };
