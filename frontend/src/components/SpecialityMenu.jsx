import React from 'react'
import {specialityData} from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center md:my-10 px-2 w-auto'>
      <h1 className='text-2xl font-semibold md:mt-auto mt-6 md:mb-auto mb-2'>Find by Speciality</h1>
      <h1 className='md:my-2 md:mb-5 mb-6'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</h1>
      <div className='grid md:grid-cols-6 grid-cols-2 gap-8'>
        {specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)}className='hover:scale-110 transition' key={index} to={`/doctor/${item.speciality}`}>
                <img className='w-16'src={item.image}/>
                <p className='text-xs'>{item.speciality}</p>
            </Link>
        ))}
      </div>
    </div> 
  )
}

export default SpecialityMenu
