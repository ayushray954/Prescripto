import React, { useContext, useEffect, useState } from 'react'
import { AppContex } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctor = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContex);
    const [relatedDoc, setRelatedDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const relDoc = doctors.filter((doc) => speciality === doc.speciality && docId !== doc._id);
            setRelatedDoc(relDoc);
            console.log(relDoc);
        }
    }, [docId, speciality, doctors])
    return (
        <div className='flex flex-col items-center mt-16'>
            <p className='text-3xl font-semibold'>Related Doctors</p>
            <p className='text-gray-400 text-sm mt-4 mb-8'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='grid md:grid-cols-5 grid-cols-1 gap-6 md:w-[1000px] px-2 mb-10'>
                {relatedDoc.slice(0, 5).map((item, index) => (
                    <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 bg-white overflow-hidden hover:scale-105 transition rounded-sm' key={index}>
                        <img onClick={() => scrollTo(0, 0)} className='bg-blue-50' src={item.image} />
                        <div className={`flex flex-row items-center gap-2 ${item.available ? 'text-green-500' : 'text-gray-500'} pl-2`}>
                            <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <div className='pl-2'>
                            <h1 className='text-xl font-semibold'>{item.name}</h1>
                            <p>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default RelatedDoctor
