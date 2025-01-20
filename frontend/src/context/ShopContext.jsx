import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const currency = "Rs.";
  const delivery_fee = 99;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();


  // Add product to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        toast("Added to cart");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  // Get total cart count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) => {
      return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  // Update cart item quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  // Get total cart amount
  const getCartAmount = () => {
    if (products.length === 0) return 0;

    return Object.entries(cartItems).reduce((totalAmount, [itemId, sizes]) => {
      const product = products.find((p) => p._id === itemId);
      if (!product) return totalAmount;

      const itemTotal = Object.values(sizes).reduce(
        (sum, qty) => sum + product.price * qty,
        0
      );

      return totalAmount + itemTotal;
    }, 0);
  };

  // Fetch products data
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Fetch user cart data
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/cart/get',
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };


//   // Fetch user data
const getUserData = async () => {
  try {
    const response = await axios.get(backendUrl + '/api/profile', {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("User data response:", response.data);
    if (response.data.success) {
      setUserData(response.data.data);
    } else {
      setUserData(null); // Reset if API fails
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    setUserData(null); // Reset in case of error
    toast.error(error.message);
  }
};
const addToWishlist = (productId) => {
  if (!wishlist.includes(productId)) {
    setWishlist((prev) => [...prev, productId]); // Correctly update state
    toast("Added to wishlist"); 
  } else {
    toast.error("Product already in wishlist");
  }
};

// Remove from wishlist
const removeFromWishlist = (productId) => {
  setWishlist(wishlist.filter((id) => id !== productId));
  toast("Removed from wishlist");
};

useEffect(() => {
  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  setWishlist(storedWishlist);
}, []);

// Save wishlist to localStorage whenever it changes
useEffect(() => {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}, [wishlist]);


const fetchWishlist = async () => {
  try {
    if (!token) return;

    const response = await axios.get(backendUrl + '/api/wishlist', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setWishlist(response.data.wishlist || []);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
  }
};


 useEffect(() => {
  getProductsData();
  fetchWishlist();
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    setToken(storedToken);
    getUserCart(storedToken);
    
  }
}, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    isLoggedin,
    setIsLoggedIn,
    getUserData,
    userData,
    wishlist,
    setWishlist,
  addToWishlist,
  removeFromWishlist,
    setUserData,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;