import React, { useContext } from 'react'; // Importing React and the useContext hook.
import { ShopContext } from '../context/ShopContext'; // Importing ShopContext to access global shopping-related data.
import Title from './Title'; // Importing the Title component for dynamic section titles.

const CartTotal = () => {
    // Destructuring required values from the ShopContext.
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    return (
        <div className='w-full'>
            {/* Cart Total Section Title */}
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTAL'} /> {/* Dynamic title for the cart total section */}
            </div>

            {/* Cart Details */}
            <div className='flex flex-col gap-2 mt-2 text-l'>
                {/* Subtotal Row */}
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    {/* Displaying the subtotal amount */}
                    <p>{currency} {getCartAmount()}.00</p> 
                </div>
                <hr /> {/* Horizontal divider */}

                {/* Shipping Fee Row */}
                <div className='flex justify-between'>
                    <p>Shipping Fee</p>
                    {/* Displaying the fixed delivery fee */}
                    <p>{currency} {delivery_fee}.00</p>
                </div>
                <hr /> {/* Horizontal divider */}

                {/* Total Row */}
                <div className='flex justify-between'>
                    <b>Total</b>
                    {/* Calculating the total: Subtotal + Shipping Fee. If the cart is empty, the total is 0. */}
                    <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal; // Exporting the CartTotal component for use in other parts of the application.
