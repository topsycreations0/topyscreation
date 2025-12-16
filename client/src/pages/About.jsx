import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
        </div>

        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="about image" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-black-800'>
            <p>Topsy Creation was born in Ibadan, Nigeria, out of a deep love for storytelling through fabric \u2014 reimagining traditional Yoruba and Nigerian motifs, colours, and textures for today\u2019s woman, man, and child.</p>
            <p>From handpicked Ankara-inspired prints to clean, minimalist tailoring, every piece is designed to honour our roots while fitting effortlessly into global, everyday style.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>Our mission at Topsy Creation is to celebrate Nigerian heritage with uniquely crafted designs, giving our community the confidence to stand out, feel seen, and wear their culture with pride.</p>
          </div>
        </div>
        <div className='text-2xl py-4'>
          <Title text1={'WHY'} text2={'US?'} />
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
    </div>
  )
}

export default About