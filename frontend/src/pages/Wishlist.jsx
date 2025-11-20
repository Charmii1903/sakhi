import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Trash } from "lucide-react"; 
const Wishlist = () => {
  const { wishlist, products, removeFromWishlist } = useContext(ShopContext);

  if (!products || products.length === 0) {
    return <p>Loading wishlist...</p>;
  }


  const wishlistProducts = products?.length
    ? products.filter((product) => wishlist.includes(product._id))
    : [];

  return (
    <div className="wishlist-page">
      <h1 className="text-2xl text-gray-700 mb-6">Your Wishlist</h1>
      {wishlistProducts.length === 0 ? (
        <p>Your wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product._id} className="relative group">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
              {/* Bin Icon */}
              <button
                onClick={() => removeFromWishlist(product._id)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full  group-hover:opacity-100 transition-opacity"
              >
                <Trash className="text-white" />
              </button>
              {/* Product Details */}
              <div className="mt-3">
                <h2 className="text-lg font-medium text-gray-700">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-500">Rs.{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
