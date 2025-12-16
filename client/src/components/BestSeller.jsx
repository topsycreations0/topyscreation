import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing the context to access shop data globally.
import Title from './Title'; // Importing the Title component for displaying section titles.
import ProductItem from './ProductItem'; // Importing the ProductItem component for rendering individual product details.

const BestSeller = () => {
    const { products } = useContext(ShopContext); // Destructuring products from the ShopContext.
    const [bestSeller, setBestSeller] = useState([]); // State to store the list of best-selling products.

    useEffect(() => {
        // Filter the products to only include those marked as "bestseller".
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5)); // Take the first 5 best-selling products for display.
    }, [products]); // Dependency array ensures this effect runs whenever the products array changes.

    return (
        <div className='my-10'>
            {/* Section Header */}
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} /> {/* Dynamic section title */}
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Community favorites that fuse Nigerian flair with refined craftsmanship—pieces you won\u2019t find anywhere else.
                </p>
            </div>

            {/* Display the Best-Selling Products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        // Render a ProductItem component for each best-selling product.
                        <ProductItem 
                            key={index} // Unique key for React rendering optimization.
                            id={item._id} // Pass product ID as a prop.
                            name={item.name} // Pass product name as a prop.
                            image={item.image} // Pass product image URL as a prop.
                            price={item.price} // Pass product price as a prop.
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default BestSeller; // Export the BestSeller component for use in other parts of the application.
