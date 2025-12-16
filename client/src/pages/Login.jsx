import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  // State variables for handling form inputs and current state (Login/Sign Up)
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext); // Context values
  const [name, setName] = useState('');  // Name input for Sign Up
  const [password, setPassword] = useState('');  // Password input
  const [email, setEmail] = useState('');  // Email input

  // Form submission handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    try {
      if (currentState === 'Sign Up') {
        // Sign up request
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);  // Save the token to the context
          localStorage.setItem('token', response.data.token);  // Save the token to localStorage
        } else {
          toast.error(response.data.message);  // Display error message
        }
        
      } else {
        // Login request
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);  // Save the token to the context
          localStorage.setItem('token', response.data.token);  // Save the token to localStorage
        } else {
          toast.error(response.data.message);  // Display error message
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);  // Display error message in case of an exception
    }
  }

  // Redirect to home page if user is already logged in (token exists)
  useEffect(() => {
    if (token) {
      navigate('/');  // Navigate to the homepage
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      {/* Title for the form */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='cormorant-garamond-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {/* Name input (only shown in Sign Up state) */}
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      
      {/* Email input */}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      
      {/* Password input */}
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      
      {/* Forgot password and Switch between Login/Sign Up */}
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {
          currentState === 'Sign Up' ? '' : <p className='cursor-pointer'>Forgot Password</p>
        }
        {
          currentState === 'Login'
          ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>  // Switch to Sign Up form
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer px-40'>Login Here</p>  // Switch to Login form
        }
      </div>
      
      {/* Submit Button with dynamic text */}
      <button className='bg-black text-white font-light px-8 py-2 mt-4 active:bg-red-700'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}  {/* Change button text based on the current state */}
      </button>
    </form>
  )
}

export default Login
