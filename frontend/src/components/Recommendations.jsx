import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/recommender/recommendations/${userId}`);
        setRecommendations(response.data.recommendations || []);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (userId) {
      fetchRecommendations();
    }
  }, [userId, backendUrl]);

  return (
    <div className="recommendations">
      <h2 className="text-xl font-semibold text-center py-4">Recommended Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendations.length > 0 ? (
          recommendations.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              image={product.images} 
              name={product.name}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No recommendations found.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
