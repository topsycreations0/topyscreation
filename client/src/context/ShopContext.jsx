import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // Constants for currency and delivery fee
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Backend URL from environment variables
  
  // State variables
  const [search, setSearch] = useState(""); // Search term
  const [showSearch, setShowSearch] = useState(false); // Whether to show the search bar
  const [cartItems, setCartItems] = useState({}); // Cart items stored in an object
  const [products, setProducts] = useState([]); // List of products
  const [token, setToken] = useState(""); // User token for authentication
  
  const navigate = useNavigate(); // For navigation between pages

  // Add an item to the cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select A Product Size");
      return;
    }

    let cartData = structuredClone(cartItems); // Create a deep copy of the cart items

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increase quantity of the same item
      } else {
        cartData[itemId][size] = 1; // Set quantity to 1 for a new size
      }
    } else {
      cartData[itemId] = {}; // Initialize new item
      cartData[itemId][size] = 1; // Set quantity to 1 for the new item and size
    }
    setCartItems(cartData); // Update the cart items in state

    // If user is authenticated, send data to the backend to update the cart
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get total count of items in the cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item]; // Add the quantity of the item
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
    return totalCount; // Return the total count
  };

  // Update the quantity of an item in the cart
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems); // Create a deep copy of the cart items

    cartData[itemId][size] = quantity; // Update the quantity of the item

    setCartItems(cartData); // Update the cart items in state

    // If user is authenticated, update cart on the backend
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get the total amount of the cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items); // Find product info based on ID
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item]; // Calculate total amount for the item
          }
        } catch (error) {}
      }
    }
    return totalAmount; // Return the total amount
  };

  // Fetch product data from the backend
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products); // Set product data in state
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get user's cart data if the user is authenticated
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData); // Set the cart data in state
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch product data when the component mounts
  useEffect(() => {
    getProductsData();
  }, []);

  // Check for token in local storage to get user data
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem('token'));
    }
  }, [token]);

  // Values to be provided to the context
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
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children} {/* Render children components that consume the context */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
