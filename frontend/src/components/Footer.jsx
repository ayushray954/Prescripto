import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-white text-gray-600 border-t border-gray-200 md:mx-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 px-6 py-12">
        <div className="md:w-1/2">
          <img src={assets.logo} alt="Logo" className="mb-4" />
          <p className="text-sm leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
        <div className="md:w-1/4">
          <p className="text-lg font-semibold mb-3 text-black">Company</p>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="md:w-1/4">
          <p className="text-lg font-semibold mb-3 text-black">Get in Touch</p>
          <p className="text-sm"> +1-212-456-7890</p>
          <p className="text-sm">prescripto@gmail.com</p>
        </div>

      </div>
      <div className='py-4'>
        <hr/>
      <p className='flex justify-center'>Copyright © 2024 prescripto - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
