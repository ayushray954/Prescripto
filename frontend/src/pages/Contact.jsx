import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-6 py-10 md:px-24 md:py-20">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
        CONTACT <span className="text-black">US</span>
      </h2>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-20">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={assets.contact_image}
            alt="contact"
            className="w-full max-w-[400px] h-auto object-cover rounded-xl"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">OUR OFFICE</h3>
            <p className="text-gray-600">54709 Willms Station</p>
            <p className="text-gray-600">Suite 350, Washington, USA</p>
            <p className="text-gray-600 mt-2">Tel: (415) 555-0132</p>
            <p className="text-gray-600">Email: greatstackdev@gmail.com</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">CAREERS AT PRESCRIPTO</h3>
            <p className="text-gray-600 mb-4">
              Learn more about our teams and job openings.
            </p>
            <button className="border px-4 py-2 rounded hover:bg-gray-100 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
