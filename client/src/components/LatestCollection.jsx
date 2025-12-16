import React, { useContext, useEffect, useState } from 'react'; // Importing necessary React hooks and context
import { ShopContext } from '../context/ShopContext'; // Importing ShopContext to get shop-related data
import Title from './Title'; // Importing Title component to display section headings
import ProductItem from './ProductItem'; // Importing ProductItem component to display individual products

const LatestCollection = () => {

    const { products } = useContext(ShopContext); // Accessing the products array from the context
    const [latestProducts, setLatestProducts] = useState([]); // State to store the latest products

    // useEffect hook to fetch and set the latest 10 products when products change
    useEffect(() => {
        setLatestProducts(products.slice(0, 10)); // Setting the first 10 products as the latest collection
    }, [products]); // Dependency on 'products', will run every time products changes

  return (
    <div className='my-10'>
        {/* Section Heading */}
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTIONS'} /> {/* Title Component */}
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Discover fresh arrivals inspired by Nigerian stories—signature Ankara prints, hand-finished textures, and unique cuts made for bold, modern wardrobes.
            </p>
        </div>

        {/* Rendering Products Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                latestProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                    // Mapping over latestProducts array and passing necessary props to ProductItem component
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection; // Exporting LatestCollection component
