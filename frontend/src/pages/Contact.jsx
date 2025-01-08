import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import ContactUs from '../components/ContactUs';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Content Section */}
      <div className="my-10 flex flex-col md:flex-row items-center justify-center gap-10 mb-28">
        {/* Image */}
        <img
          className="w-full md:max-w-[480px] border border-gray-400"
          src='/contactt.jpg'
          alt="Contact Illustration"
        />

        {/* Contact Form */}
        <div className="w-full md:w-1/2">
          <ContactUs />
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default Contact;
