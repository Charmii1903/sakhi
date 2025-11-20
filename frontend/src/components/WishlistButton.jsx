import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';


const WishlistButton = ({ product }) => {
  const { addToWishlist } = useContext(ShopContext);

  const handleAddToWishlist = () => {
    const userId = localStorage.getItem('userId'); 
    console.log('Retrieved userId:', userId); 

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    addToWishlist(userId, product._id);
  };

  return (
    <button onClick={handleAddToWishlist} className="wishlist-button">
      Add to Wishlist
    </button>
  );
};

export default WishlistButton;
