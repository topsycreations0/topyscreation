import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';

const Orders = () => {

  const { backendUrl, token, currency } = useContext(ShopContext);  // Fetch necessary context values
  const [orderData, setOrderData] = useState([]);  // State to hold the order data

  // Function to load the user's order data from the API
  const loadOrderData = async () => {
    try {
      if (!token) {  // If no token, don't proceed
        return null;
      }

      // Make API call to fetch orders for the logged-in user
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });

      if (response.data.success) {
        let allOrdersItem = [];  // Array to hold the merged order items

        // Loop through the orders and add the order details to each item
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrdersItem.push(item);  // Add item to the list
          });
        });

        setOrderData(allOrdersItem.reverse());  // Set the order data state with reversed items
      }

    } catch (error) {
      // Handle any errors (could add error handling logic here)
    }
  }

  // Effect hook to load order data when the component mounts or when the token changes
  useEffect(() => {
    loadOrderData();
  }, [token]);  // Dependency on token to re-fetch data when the token changes

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        {/* Title component for the page */}
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          // Map over the order data to display each order item
          orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                {/* Display product image */}
                <img className='w-16 sm:w-20' src={item.image[0]} alt="order item image" />
                <div>
                  {/* Display product name and details */}
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                    <p>{currency}{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  {/* Display order date and payment method */}
                  <p className='mt-1'>Date: <span className='text-black-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-black-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                {/* Order status and track button */}
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>
                {/* Button to track the order (currently calls loadOrderData on click) */}
                <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
