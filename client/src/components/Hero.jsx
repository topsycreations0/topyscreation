import React from 'react'; // Importing React
import { assets } from '../assets/assets'; // Importing assets (e.g., hero image) from the assets folder

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero on the Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[-#414141]'>
                {/* Section Header */}
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p> {/* Decorative line */}
                    <p className='font-medium text-sm md:text-base'>BESTSELLERS</p> {/* Subtitle */}
                </div>
                
                {/* Main Title */}
                <h1 className='cormorant-garamond-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>
                    Latest Arrivals
                </h1>
                
                {/* Call to Action Section */}
                <div className='flex items-center gap-2'>
                  <p className='font-semibold text-sm md:text-base'>SHOP NOW</p> {/* Button text */}
                  <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p> {/* Decorative line */}
                </div>
            </div>
        </div>

        {/* Hero Right Side - Image */}
        <img className='w-full sm:w-1/2' src={assets.hero_img} alt="hero image" /> {/* Displaying hero image */}
    </div>
  )
}

export default Hero; // Exporting Hero component for use in other parts of the application.
