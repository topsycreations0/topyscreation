import axios from "axios"; // Importing axios for making HTTP requests
import React, { useEffect, useState } from "react"; // Importing React hooks
import { backendUrl, currency } from "../App"; // Importing backend URL and currency format
import { toast } from "react-toastify"; // Importing toast for notifications

const List = ({ token }) => {
  const [list, setList] = useState([]); // State to hold the list of products

  // Fetch the product list from the backend
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products); // Update the list state
      } else {
        toast.error(response.data.message); // Show error message if the response is unsuccessful
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
      toast.error(error.message); // Show error toast
    }
  };

  // Remove a product by ID
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id }, // Send the product ID to be removed
        { headers: { token } } // Send token in headers for authentication
      );

      if (response.data.success) {
        toast.success(response.data.message); // Notify success
        await fetchList(); // Refresh the product list
      } else {
        toast.error(response.data.message); // Notify failure
      }
    } catch (error) {
      console.log(error); // Log errors for debugging
      toast.error(error.message); // Show error toast
    }
  };

  // Fetch the product list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-2">List of All Products</p>
      <div className="flex flex-col gap-2">
        {/* Table Header (Visible on medium and larger screens) */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 border text-sm"
            key={index}
          >
            {/* Product Image */}
            <img className="w-12" src={item.image[0]} alt="product image" />

            {/* Product Name */}
            <p>{item.name}</p>

            {/* Product Category */}
            <p>{item.category}</p>

            {/* Product Price */}
            <p>
              {currency}
              {item.price}
            </p>

            {/* Remove Button */}
            <p
              onClick={() => removeProduct(item._id)} // Handle product removal
              className="text-right md:text-center cursor-pointer text-lg text-red-500"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List; // Exporting the List component
