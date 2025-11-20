import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to Sakhi, your ultimate destination for stylish and trendy ladies' clothing. </p>
        <p>At Sakhi, we believe that fashion is not just about clothes—
          it’s about expressing individuality, embracing confidence, 
          and celebrating the unique beauty of every woman. Our carefully curated collections are 
          designed to keep you in step with the latest trends while providing comfort and versatility for every occasion.
           Whether you're looking for chic casual wear, elegant formal attire, or statement pieces to elevate your wardrobe, we’ve got you covered.</p>
          <b className='text-gary-800'>Our Mission</b>
          <p>Our mission is to empower women through fashion by providing clothing that reflects their individuality, 
            enhances their confidence, and fits seamlessly into their lifestyle. We aim to create a seamless shopping 
            experience where quality, convenience, and exceptional service come together to make every woman’s journey with Sakhi unforgettable.</p>
        </div>
      </div>
      <div className='text-2xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance : </b>
          <p>At Sakhi, quality is our priority. Every product undergoes rigorous quality checks to ensure you 
            receive only the best. We use premium fabrics and cutting-edge designs to deliver clothing that looks great and lasts long.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience :  </b>
          <p>At Sakhi, quality is our priority. Every product undergoes rigorous quality checks to ensure you receive only the best. 
            We use premium fabrics and cutting-edge designs to deliver clothing that looks great and lasts long.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service : </b>
          <p>Your satisfaction means everything to us. Our dedicated customer support team is always ready to assist you, whether it’s 
            answering queries, solving issues, or helping you find the perfect outfit.</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About