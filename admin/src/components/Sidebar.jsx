import React from 'react'; // Importing React for component creation
import { NavLink } from 'react-router-dom'; // Importing NavLink for navigation
import { assets } from '../assets/assets'; // Importing assets such as icons

// Sidebar Component: Displays a vertical navigation menu
const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        {/* Container for navigation links */}
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

            {/* Link to Add Items */}
            <NavLink 
                className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' 
                to="/add"
            >
                <img 
                    className='w-5 h-5' 
                    src={assets.add_icon} 
                    alt="add icon" 
                />
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            {/* Link to List Items */}
            <NavLink 
                className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' 
                to="/list"
            >
                <img 
                    className='w-5 h-5' 
                    src={assets.order_icon} 
                    alt="list items icon" 
                />
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            {/* Link to Orders */}
            <NavLink 
                className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-1' 
                to="/orders"
            >
                <img 
                    className='w-5 h-5' 
                    src={assets.order_icon} 
                    alt="orders icon" 
                />
                <p className='hidden md:block'>Orders</p>
            </NavLink>

        </div>
    </div>
  );
};

export default Sidebar; // Exporting the Sidebar component
