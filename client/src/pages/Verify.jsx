import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext); // Access context values
    const [searchParams, setSearchParams] = useSearchParams();  // To read the query params from the URL

    // Get success status and orderId from URL search params
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    // Function to verify the payment
    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;  // If no token, return early
            }

            // Send a request to verify the payment with the backend
            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } });

            if (response.data.success) {
                setCartItems({});  // Clear the cart after successful payment
                navigate('/orders');  // Navigate to the orders page
            } else {
                navigate('/cart');  // Navigate to the cart if payment fails
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);  // Display any errors that occur
        }
    }

    // useEffect hook to call verifyPayment when the token is available or changes
    useEffect(() => {
        verifyPayment();
    }, [token]);  // Dependency on token to run the effect when it changes

    return (
        <div>
            {/* No content is rendered in this component directly */}
        </div>
    );
}

export default Verify;
