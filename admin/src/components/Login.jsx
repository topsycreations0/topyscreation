import axios from 'axios'; // Importing Axios for HTTP requests
import React, { useState } from 'react'; // Importing React and useState for state management
import { backendUrl } from '../App'; // Importing the backend URL from the App file
import { toast } from 'react-toastify'; // Importing toast for notifications

// Login Component: Handles admin login functionality
const Login = ({ setToken }) => {

    // State variables for email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault(); // Prevents default form submission behavior
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password }); // Sends POST request to login API
            if (response.data.success) {
                setToken(response.data.token); // Sets the token on successful login
            } else {
                toast.error(response.data.message); // Displays an error message if login fails
            }
        } catch (error) {
            console.log(error); // Logs the error to the console
            toast.error(error.message); // Displays the error message as a toast
        }
    };

    // Component's rendered output
    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                            type='email' 
                            placeholder='your@email.com' 
                            required 
                        />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' 
                            type='password' 
                            placeholder='Enter your password' 
                            required 
                        />
                    </div>
                    <button 
                        className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black active:bg-red-700' 
                        type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login; // Exporting the Login component
