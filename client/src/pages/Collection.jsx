import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  // Extracting values from the context (ShopContext)
  const { products, search, showSearch } = useContext(ShopContext);

  // Local state for managing filter visibility, filtered products, selected categories, and sorting preferences
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);  // Holds selected categories (e.g., 'Men', 'Women', etc.)
  const [subCategory, setSubCategory] = useState([]);  // Holds selected subcategories (e.g., 'Topwear', 'Bottomwear')
  const [sortType, setSortType] = useState('relevant');  // Default sorting type

  // Toggle category selection (check/uncheck)
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  // Toggle subcategory selection (check/uncheck)
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  // Apply filters based on selected categories and subcategories, and search query
  const applyFilter = () => {
    let productsCopy = products.slice(); // Make a shallow copy of the products list

    // Apply search filter if a search term is provided
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Apply category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // Apply subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // Update filtered products state
    setFilterProducts(productsCopy);
  }

  // Sort products based on selected sort type
  const sortProduct = () => {
    let fpCopy = filterProducts.slice(); // Make a shallow copy of the filtered products

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price))); // Sort by low to high price
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price))); // Sort by high to low price
        break;

      default:
        applyFilter(); // Default sorting, apply filters again
        break;
    }
  }

  // Effect hook to apply filters whenever categories, subcategories, or search terms change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  // Effect hook to sort the filtered products whenever the sort type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        
        {/* Left Side - Filter Options */}
        <div className='min-w-60'>
          {/* Filter title and toggle icon */}
          <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown icon" />
          </p>
          
          {/* Category Filter - visible when filter is toggled on */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
              </p>
            </div>
          </div>

          {/* Subcategory Filter - visible when filter is toggled on */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
              </p>
              <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
              </p>
            </div>
          </div>
        </div>

      {/* Right Side - Product Listings */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-b'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} /> {/* Title of the page */}
          
          {/* Product Sorting Dropdown */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 mb-3'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map and display filtered products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
