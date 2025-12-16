import React, { useContext, useState } from "react"; // Importing React and necessary hooks
import { assets } from "../assets/assets"; // Importing assets for images
import { Link, NavLink } from "react-router-dom"; // Importing React Router components for navigation
import { ShopContext } from "../context/ShopContext"; // Importing the context to manage shop-related state

const Navbar = () => {
  const [visible, setVisible] = useState(false); // State to toggle the visibility of the sidebar menu

  const {
    setShowSearch, // Function to show search bar
    getCartCount, // Function to get the number of items in the cart
    navigate, // Function to navigate between pages
    token, // Accessing the user's authentication token
    setToken, // Function to set the authentication token
    setCartItems, // Function to clear the cart items on logout
  } = useContext(ShopContext); // Accessing the shop context for managing shop data

  // Logout function to clear user session and navigate to the login page
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token"); // Remove token from local storage
    setToken(""); // Reset token state
    setCartItems({}); // Clear cart items
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/"> {/* Linking to home page */}
        <img src={assets.logo} className="w-36" alt="Topsy Creation logo" /> {/* Logo */}
      </Link>

      {/* Navigation menu for larger screens */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {/* Search icon */}
        <Link to="/collection">
          <img
            onClick={() => setShowSearch(true)} // Triggering search functionality
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search icon"
          />
        </Link>

        {/* Profile icon with dropdown */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))} // If token exists, do nothing, else navigate to login
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="profile icon"
          />
          {/* Dropdown menu for logged-in users */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart icon */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-sqaure rounded-full text-[12px]">
            {getCartCount()} {/* Displaying the cart count */}
          </p>
        </Link>

        {/* Mobile menu icon */}
        <img
          onClick={() => setVisible(true)} // Toggling the sidebar visibility
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu icon"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)} // Close sidebar
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="dropdown icon"
            />
            <p>Back</p>
          </div>

          {/* Sidebar navigation links */}
          <NavLink
            onClick={() => setVisible(false)} // Close sidebar after clicking link
            className="py-2 pl-6 border"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)} // Close sidebar after clicking link
            className="py-2 pl-6 border"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)} // Close sidebar after clicking link
            className="py-2 pl-6 border"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)} // Close sidebar after clicking link
            className="py-2 pl-6 border"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar; // Exporting the Navbar component
