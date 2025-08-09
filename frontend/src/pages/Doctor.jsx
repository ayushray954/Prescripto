import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContex } from '../context/AppContext';

const Doctor = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContex);
  console.log(doctors);

  const filterApply = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((ele) => ele.speciality === speciality));
    } else setFilterDoc(doctors);
  }

  useEffect(() => {
    filterApply();
  }, [doctors, speciality])

  return (
    <div className='mx-4 md:mx-24 my-10'>
      <p className='text-gray-600 mb-6 md:mb-10 font-semibold text-base md:text-lg'>
        Browse through the doctors specialist.
      </p>

      <div className='flex flex-col md:flex-row gap-10 md:gap-10'>
        <div className='flex flex-wrap md:flex-col gap-4 text-sm text-gray-600'>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctor') : navigate('/doctor/General physician')} className={`border w-40 rounded pl-3 border-gray-300 cursor-pointer ${speciality==='General physician' ? "bg-indigo-100" : ""}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctor') : navigate('/doctor/Gynecologist')} className={`border w-40 rounded pl-3 border-gray-300 cursor-pointer ${speciality==='Gynecologist' ? "bg-indigo-100" : ""}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctor') : navigate('/doctor/Dermatologist')} className={`border w-40 rounded pl-3 border-gray-300 cursor-pointer ${speciality==='Dermatologist' ? "bg-indigo-100" : ""}`}>Dermatologist</p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctor') : navigate('/doctor/Pediatricians')} className={`border w-40 rounded pl-3 border-gray-300 cursor-pointer ${speciality==='Pediatricians' ? "bg-indigo-100" : ""}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctor') : navigate('/doctor/Neurologist')} className={`border w-40 rounded pl-3 border-gray-300 cursor-pointer ${speciality==='Neurologist' ? "bg-indigo-100" : ""}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctor') : navigate('/doctor/Gastroenterologist')} className={`border w-40 rounded pl-3 border-gray-300 cursor-pointer ${speciality==='Gastroenterologist' ? "bg-indigo-100" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6'>
          {filterDoc.map((item) => (
            <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 bg-white overflow-hidden hover:scale-105 transition rounded-sm' key={item._id}>
              <img className='bg-blue-50' src={item.image} />
              <div className='flex flex-row items-center gap-2 text-green-400 pl-2'>
                <p className='w-2 h-2 rounded-full bg-green-500'></p><p>Available</p>
              </div>
              <div className='pl-2'>
                <h1 className='text-xl font-semibold'>{item.name}</h1>
                <p>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctor;
