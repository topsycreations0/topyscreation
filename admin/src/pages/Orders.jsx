import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App"; // Importing the backend URL and currency symbol from the main app configuration.
import { toast } from "react-toastify"; // Importing toast for displaying notifications.
import { assets } from "../assets/assets"; // Importing assets, presumably containing static resources like icons.

const Orders = ({ token }) => { // The Orders component receives a token as a prop.
  const [orders, setOrders] = useState([]); // State to store the list of orders.

  // Function to fetch all orders from the server.
  const fetchAllOrders = async () => {
    if (!token) { // Check if token is provided.
      return null; // Exit early if no token.
    }

    try {
      // Make a POST request to fetch the list of orders, using the provided token for authentication.
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders); // Update state with the fetched orders if the response is successful.
      } else {
        toast.error(response.data.message); // Show an error message if the response indicates failure.
      }
    } catch (error) {
      toast.error(error.message); // Display any network or server errors.
    }
  };

  // Function to handle order status changes.
  const statusHandler = async (event, orderId) => {
    try {
      // Make a POST request to update the status of an order.
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value }, // Include the order ID and the new status in the request body.
        { headers: { token } } // Use the token for authentication.
      );

      if (response.data.success) {
        await fetchAllOrders(); // Refresh the list of orders if the status update is successful.
      }
    } catch (error) {
      console.log(error); // Log the error to the console for debugging.
      toast.error(error.message); // Display an error message.
    }
  };

  // Fetch all orders when the component is first rendered or when the token changes.
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => ( // Loop through the orders and render each order.
          <div 
            key={index} // Unique key for each order.
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img className="w-12" src={assets.parcel_icon} alt="parcel icon" /> {/* Display a parcel icon for each order. */}
            <div>
              <div>
                {/* Render the items in the order */}
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) { // Check if the item is the last in the list.
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else { // Add a comma for items that are not the last.
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName} {/* Display the customer's name. */}
              </p>
              <div>
                {/* Render the address details */}
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p> {/* Display the phone number. */}
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p> {/* Display the number of items. */}
              <p className="mt-3">Method: {order.paymentMethod}</p> {/* Display the payment method. */}
              <p>Payment: {order.payment ? 'Done' : 'Pending...'}</p> {/* Indicate whether payment is complete. */}
              <p>Date: {new Date(order.date).toLocaleDateString()}</p> {/* Display the order date. */}
            </div>
            <p className="text-sm sm:text-[20px]">{currency}{order.amount}</p> {/* Display the order amount. */}
            {/* Dropdown to change the order status */}
            <select 
              onChange={(event) => statusHandler(event, order._id)} 
              value={order.status} 
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; // Export the Orders component.
