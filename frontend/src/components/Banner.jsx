import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';


const Banner = () => {
 const navigate = useNavigate();
  return (
    <div className='flex justify-center'>
      <div className='bg-primary flex flex-row w-full max-w-[1000px] md:max-w-[1200px] md:h-96 h-56 md:my-10 my-4 mx-4 rounded-lg'>
        <div className='flex flex-col justify-center w-1/2 pl-4 md:pl-16'>
          <h1 className='text-xl md:text-4xl font-semibold text-white mb-2 md:mb-4'>Book Appointment</h1> 
          <h1 className='text-xl md:text-4xl font-semibold text-white'>With 100+ Trusted Doctors</h1>
          <button onClick={()=>{navigate('/login');scrollTo(0,0)}} className='bg-white px-4 py-1 w-40 rounded-full mt-4 md:mt-6'>Create account</button>
        </div>
        <div className='hidden md:block'>
          <img className='h-56 md:h-96 object-contain pl-4 md:pl-10' src={assets.appointment_img} alt="doctor" />
        </div>
      </div>
    </div>
  )
}

export default Banner
