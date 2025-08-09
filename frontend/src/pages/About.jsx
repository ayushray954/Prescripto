import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="mx-4 md:mx-24 py-10 text-sm md:text-base text-gray-700 space-y-10">
      <div className="text-center">
        <p className="text-lg md:text-2xl font-semibold">ABOUT <span className="text-black">US</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 ">
        {/* Image Section - 50% width */}
        <div className="w-full md:w-[400px]">
          <img src={assets.about_image} alt="about" className="w-full rounded" />
        </div>

        {/* Text Section - 50% width */}
        <div className="w-full md:w-1/2 space-y-4 md:pl-24">
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
            At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments
            and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our
            platform, integrating the latest advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you
            every step of the way.
          </p>
          <p className="font-semibold">Our Vision</p>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the
            gap between patients and healthcare providers, making it easier for you to access the care you need, when
            you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="space-y-6">
        <p className="text-base md:text-lg font-semibold">WHY <span className="text-black">CHOOSE US</span></p>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200">
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <p className="font-bold text-sm uppercase mb-2">Efficiency:</p>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
            <p className="font-bold text-sm uppercase mb-2">Convenience:</p>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="p-6">
            <p className="font-bold text-sm uppercase mb-2">Personalization:</p>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
