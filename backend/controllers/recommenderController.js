import productModel from "../models/productModel.js";

// Get product recommendations
export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    // Example: Recommend top-rated products or products from a category the user has interacted with
    const recommendedProducts = await productModel
      .find({ bestseller: true }) // Logic can be adjusted
      .limit(10);

    res.status(200).json({
      success: true,
      recommendations: recommendedProducts,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
