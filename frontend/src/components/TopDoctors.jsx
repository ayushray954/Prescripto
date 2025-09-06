
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContex } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const {doctors} = useContext(AppContex);
  return (
    <div className='flex flex-col items-center mt-16 my-16'>
      <h1 className='text-2xl font-semibold'>Top Doctors to Book</h1>
      <p className='mt-2 md:px-auto px-2'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='grid md:grid-cols-5 grid-cols-1 gap-6 mt-6 md:w-[1000px] px-2'>
        {doctors.slice(0,10).map((item , idx)=>(
             <div onClick={()=>navigate(`/appointment/${item._id}`)}className='border border-blue-200 bg-white overflow-hidden hover:scale-105 transition rounded-sm'key={item._id}>
                <img className='bg-blue-50'src={item.image}/>
                <div className={`flex flex-row items-center gap-2 ${item.available ? 'text-green-500': 'text-gray-500'} pl-2`}>
                    <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500' }`}></p><p>{item.available ? 'Available': 'Not Available'}</p>
                </div>
                <div className='pl-2'>
                    <h1 className='text-xl font-semibold'>{item.name}</h1>
                    <p>{item.speciality}</p>
                </div>
             </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/doctor'); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 mt-10 px-12 py-3 rounded-full'>More</button>

    </div>
  )
}

export default TopDoctors
