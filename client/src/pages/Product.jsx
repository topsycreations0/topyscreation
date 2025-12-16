import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const { productId } = useParams();  // Get the product ID from the URL params
  const { products, currency, addToCart } = useContext(ShopContext);  // Access products and context methods
  const [productData, setProductData] = useState(false);  // State to hold product data
  const [image, setImage] = useState('');  // State to handle the current product image
  const [size, setSize] = useState('');  // State to store the selected size

  // Function to fetch product data based on product ID
  const fetchProductData = async () => {
    // Search through all products and find the one with the matching ID
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);  // Set the product data state
        setImage(item.image[0]);  // Set the first image as the main image
        return null;
      }
    });
  }

  // useEffect hook to call fetchProductData when productId or products change
  useEffect(() => {
    fetchProductData();
  }, [productId, products]);  // Dependency on productId and products to fetch data again when either changes

  // Return JSX to render the product details
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {/* Render the product images as thumbnails */}
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}  // Set clicked image as main image
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt="clothing item image"
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            {/* Display the main image of the product */}
            <img className='w-full h-auto' src={image} alt="image" />
          </div>
        </div>

        {/* Product Information */}
        <div className='flex-1'>
          {/* Product name */}
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {/* Render the star ratings */}
            <img src={assets.star_icon} alt="star icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star icon" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="dull star icon" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          {/* Display the product price */}
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          {/* Display the product description */}
          <p className='mt-5 text-black-800 md:w-4/5'>{productData.description}</p>

          {/* Size selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {/* Render size buttons */}
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}  // Set selected size
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-red-500' : ''}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}  // Add product to cart with selected size
            className='bg-black text-white px-8 py-3 text-sm active:bg-red-700'
          >
            ADD TO CART
          </button>

          {/* Product details and policies */}
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-black-600 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Display Related Products based on the category and subcategory */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />  

    </div>
  ) : <div className='opacity-0'></div>  // If no product data, show nothing (blank)
}

export default Product;
