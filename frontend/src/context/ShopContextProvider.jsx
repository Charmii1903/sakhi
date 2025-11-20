import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "./ShopContext";
import { useCallback } from "react";



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
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  // -------------------- CART --------------------

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
        toast.error("Error adding to cart");
      }
    }
  };

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
        toast.error("Error updating cart");
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) => {
      return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

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

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error("Fetching cart failed:", error);
      toast.error("Failed to fetch cart");
    }
  };

  // -------------------- PRODUCTS --------------------

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Product fetch error:", error);
      toast.error("Failed to load products");
    }
  };

  // -------------------- USER --------------------

 const getUserData = useCallback(async () => {
  if (!token) return;
  try {
    const res = await axios.get(`${backendUrl}/api/profile/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.success) {
      setUserData(res.data.data);
      setIsLoggedIn(true);
    } else {
      // toast.error("Failed to fetch user data.");
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
    // toast.error("Failed to fetch user data.");
  }
}, [token, backendUrl]);

  // -------------------- WISHLIST --------------------

  const addToWishlist = (productId) => {
    if (!wishlist.includes(productId)) {
      const updatedWishlist = [...wishlist, productId];
      setWishlist(updatedWishlist);
      toast("Added to wishlist");
    } else {
      toast.error("Product already in wishlist");
    }
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter((id) => id !== productId);
    setWishlist(updated);
    toast("Removed from wishlist");
  };

  // const fetchWishlist = async () => {
  //   try {
  //     if (!token) return;

  //     const response = await axios.get(`${backendUrl}/api/wishlist`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.data.wishlist) {
  //       setWishlist(response.data.wishlist);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching wishlist:", error);
  //   }
  // };

  // -------------------- USE EFFECTS --------------------

  // On mount: get token, product list, cart, wishlist
  // useEffect(() => {
  //   getProductsData();

  //   const storedToken = localStorage.getItem("token");
  //   if (storedToken) {
  //     setToken(storedToken);
  //     getUserCart(storedToken);
  //     fetchWishlist();
  //   }
  
  useEffect(() => {
    getProductsData();
  
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getUserCart(storedToken);
    }
  
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  // When token updates, fetch user data
  useEffect(() => {
    if (token) {
      getUserData();
      localStorage.setItem("token", token);
    }
  }, [token, getUserData]);

  

  // Save wishlist to local storage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // -------------------- CONTEXT VALUE --------------------

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
    setUserData,
    wishlist,
    setWishlist,
    addToWishlist,
    removeFromWishlist,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;




// import { createContext, useContext, useEffect, useState } from "react";
// import axios from 'axios';
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";


//  export const ShopContext = createContext();

//  const ShopContextProvider = (props)=>{

    

//     const currency = 'Rs.'
//     const delivery_fee = 99;
//     const backendUrl = import.meta.env.VITE_BACKEND_URL
//     const [search,setSearch] = useState('');
//     const [showSearch,setShowSearch] = useState(false);
//     const [cartItems,setCartItems] = useState({});
//     const [products,setProducts] = useState([]);
//     const [token,setToken] = useState("");
//     const [profile, setProfile] = useState(null);
//     const navigate = useNavigate();

//     const addToCart = async (itemId,size)=>{
//         if(!size){
//             toast.error('Select product size')
//             return;     
//         }

//         let cartData = structuredClone(cartItems);

//         if(cartData[itemId]){
//             if(cartData[itemId][size]){
//                 cartData[itemId][size] += 1;
//             }
//             else{
//                 cartData[itemId][size] = 1;
//             }
//         }
//         else{
//             cartData[itemId]= {};
//             cartData[itemId][size] = 1;
//         }
//         setCartItems(cartData);

//         if (token) {
//             try {
//                 await axios.post(backendUrl + '/api/cart/add', {itemId,size}, {headers : {token}})
//             } catch (error) {
//                 console.log(error)
//                 toast.error(error.message)
//             }
            
//         }

//     }

//     const getCartCount = () =>{
//         let totalCount = 0;
//         for(const items in cartItems){
//             for(const item in cartItems[items]){
//                 try{
//                     if(cartItems[items][item] > 0){
//                         totalCount += cartItems[items][item];
//                     }
//                 } catch (error){

//                 }
//             }
//         }
//         return totalCount
//     }

//     const updateQuantity = async (itemId,size,quantity)=>{

//         let cartData = structuredClone(cartItems);

//         cartData[itemId][size] = quantity;

//         setCartItems(cartData);

//         if (token) {
//             try {
//                 await axios.post(backendUrl + '/api/cart/update', { itemId,size,quantity }, {headers : {token}})
//             } catch (error) {
//                 console.log(error)
//                 toast.error(error.message)
//             }
//         }
//     } 

//     const getCartAmount = () => {
//         if (products.length === 0) {
//             return 0; // Products not loaded yet
//         }
//         let totalAmount = 0;
//         for (const items in cartItems) {
//             const itemInfo = products.find((product) => product._id === items);
//             if (!itemInfo) {
//                 console.warn(`Product with ID ${items} not found`);
//                 continue;
//             }
//             for (const item in cartItems[items]) {
//                 try {
//                     if (cartItems[items][item] > 0) {
//                         totalAmount += itemInfo.price * cartItems[items][item];
//                     }
//                 } catch (error) {
//                     console.log(error);
//                     toast.error(error.message);
//                 }
//             }
//         }
//         return totalAmount;
//     };
    
//     const getProductsData = async () =>{
//         try {
//             const response= await axios.get(backendUrl + '/api/product/list') 
//             if(response.data.success){
//                 setProducts(response.data.products)
//             }
//             else{
//                 toast.error(response.data.message)
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
//         }
//     }


//     const getUserCart = async (token)=>{
//         try {
//             const response = await axios.post(backendUrl + '/api/cart/get',{},{headers: {token}})
//             if (response.data.success) {
//                 setCartItems(response.data.cartData)
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.message)
//         }
//     }

//     const fetchUserProfile = async () => {
//         if (!token) {
//             console.warn("No token available for fetching user profile");
//             return;
//         }
    
//         try {
//             const response = await axios.get(backendUrl + '/api/user/profile', {
//                 headers: { Authorization: token },
//             });
    
//             if (response.data.success) {
//                 setProfile(response.data.user);
//             } else {
//                 toast.error(response.data.message || 'Failed to fetch profile data');
//             }
//         } catch (error) {
//             console.error("Error fetching profile:", error);
//             toast.error("Error fetching profile data");
//         }
//     };
//     const updateUserProfile = async (profileData) => {
//         try {
//             const response = await axios.put(
//                 backendUrl + '/api/user/profile',
//                 profileData,
//                 { headers: { Authorization: token } }
//             );
    
//             if (response.data.success) {
//                 setProfile(response.data.user);
//                 toast.success("Profile updated successfully");
//             } else {
//                 toast.error(response.data.message || "Failed to update profile");
//             }
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             toast.error("Error updating profile");
//         }
//     };

//     useEffect(()=>{
//         getProductsData();
//     },[]);

//     useEffect(()=>{
//         if(!token && localStorage.getItem('token')){
//             setToken(localStorage.getItem('token'))
//             getUserCart(localStorage.getItem('token'))
//         }
//     },[]);
//     useEffect(() => {
//         if (token) {
//             fetchUserProfile();
//         }
//     }, [token]);
    

//     const value = {
//         products,currency, delivery_fee, 
//         search, setSearch, showSearch, setShowSearch,
//         cartItems, addToCart,setCartItems,
//         getCartCount,updateQuantity,
//         getCartAmount,navigate, backendUrl,
//         setToken,token,
//         profile, fetchUserProfile, updateUserProfile,
//     }
    
//     return(
//         <ShopContext.Provider value={value}>
//             {props.children}
//         </ShopContext.Provider>
//     )
//  }

//  export default ShopContextProvider;