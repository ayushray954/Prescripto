import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='bg-primary flex md:flex-row flex-col rounded md:mx-24 mx-2 md:my-5 md:px-10 flex-wrap w-auto mt-2'>
      <div className='md:w-1/2 flex flex-col justify-center gap-5 md:pl-10 pl-8 md:order-1 order-2 md:pb-0 pb-5 md:pt-0 pt-4'>
        <p className='md:text-5xl text-2xl font-semibold text-white'>Book Appointment <br/> With Trusted Doctors</p>
        <div className='flex flex-row gap-2'>
        <img className='w-16'src={assets.group_profiles} />
        <p className='text-white md:text-xs text-[10px]'>Simply browse through our extensive list of trusted doctors,<br/> 
         schedule your appointment hassle-free.</p>
        </div>
      <a href='#speciality'className='bg-white rounded-full py-2 flex justify-center gap-2 w-44'>Book Appointment <img src={assets.arrow_icon}/> </a>
      </div>
      <div className='md:pt-10 md:order-2 order-1 rounded-sm'>
        <img className='md:max-w-xl'src={assets.header_img}/>
      </div>
    </div>
  )
}

export default Header
