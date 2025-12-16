import React from 'react'; // Importing React for building components
import { assets } from '../assets/assets'; // Importing assets, such as the logo

// Navbar Component: Displays a navigation bar with a logo and logout button
const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        {/* Logo section */}
        <img 
            className='w-[max(10%,80px)]' 
            src={assets.logo} 
            alt="Topsy Creation logo" 
        />
        {/* Logout button */}
        <button 
            onClick={() => setToken('')} // Clears the token to log out
            className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm active:bg-red-700'
        >
            Logout
        </button>
    </div>
  );
};

export default Navbar; // Exporting the Navbar component
