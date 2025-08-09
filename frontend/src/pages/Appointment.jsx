import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContex } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctor from '../components/RelatedDoctor';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol, token, backendUrl, getAllDoctors, userData } = useContext(AppContex)
    const [doctorInfo, setDoctorInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const navigate = useNavigate()
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const fetchDoctor = async () => {
        const doctor = doctors.find((item) => item._id === docId);
        setDoctorInfo(doctor);
    }

    const getAvailableSlots = () => {
        setDocSlots([]);
        let today = new Date();
        for (let i = 0; i < 7; i++) {
            let slotStartTime = new Date(today);
            slotStartTime.setDate(today.getDate() + i);

            if (today.getDate() === slotStartTime.getDate()) {
                slotStartTime.setHours(slotStartTime.getHours() > 10 ? slotStartTime.getHours() + 1 : 10);
                slotStartTime.setMinutes(slotStartTime.getMinutes() > 30 ? 30 : 0);
            } else {
                slotStartTime.setHours(10);
                slotStartTime.setMinutes(0);
            }

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            let timeSlots = [];
            while (slotStartTime < endTime) {
                let formatTime = slotStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = slotStartTime.getDate().toString().padStart(2, '0');
                let month = (slotStartTime.getMonth() + 1).toString().padStart(2, '0');
                let year = slotStartTime.getFullYear();

                const slotDate = `${day}-${month}-${year}`;
                const slotTime = formatTime

                const isSlotAvailable = doctorInfo.slots_booked[slotDate] && doctorInfo.slots_booked[slotDate].includes(slotTime) ? false : true
                if (isSlotAvailable) {
                    timeSlots.push({
                        dateTime: new Date(slotStartTime),
                        time: formatTime
                    })
                }

                slotStartTime.setMinutes(slotStartTime.getMinutes() + 30)
            }

            setDocSlots(prev => [...prev, timeSlots]);
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warn('Login to book appointment');
            return navigate('/login')
        }
        if (!slotTime) {
            toast.warn('Please select a slot time to book an appointment.');
            return;
        }
        try {
            const date = docSlots[slotIndex][0].dateTime
            // FIX: Formatted date to "DD-MM-YYYY"
            let day = date.getDate().toString().padStart(2, '0');
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let year = date.getFullYear()

            const slotDate = `${day}-${month}-${year}`;

            const resp = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime, userId: userData?._id }, { headers: { token } })

            if (resp.data.success) {
                toast.success(resp.data.message)
                getAllDoctors()
                navigate('/my-appointment')
            }
            else {
                toast.error(resp.data.message);
            }
        }
        catch (error) {
            console.error("Booking Error:", error);
            toast.error(error.response?.data?.message || 'An error occurred while booking the appointment.');
        }
    }

    useEffect(() => {
        fetchDoctor();
    }, [docId, doctors])

    useEffect(() => {
        if (doctorInfo) {
            getAvailableSlots();
        }
    }, [doctorInfo])

    return doctorInfo && (
        <div className='px-4 md:px-24'>
            <div className='flex flex-col md:flex-row my-6 md:my-10 gap-4'>
                <div>
                    <img className="bg-primary rounded-lg w-full md:w-[700px] h-auto object-cover" src={doctorInfo.image} />
                </div>
                <div className='border border-gray-400 rounded-md px-4 md:px-8 py-5 md:py-7 bg-white'>
                    <div className='flex flex-row gap-3 items-baseline'>
                        <p className='text-xl md:text-3xl font-semibold'>{doctorInfo.name}</p>
                        <img className='h-4 md:h-6' src={assets.verified_icon} />
                    </div>
                    <div className='flex flex-wrap gap-2 items-center text-gray-600 text-sm mt-2'>
                        <p>{doctorInfo.degree} - {doctorInfo.speciality}</p>
                        <button className='border border-gray-200 rounded-lg px-2 py-0.5'>{doctorInfo.experience}</button>
                    </div>
                    <div className='mt-2'>
                        <p className='flex items-center gap-2 text-sm'>About <img src={assets.info_icon} className='h-4 w-4' /></p>
                        <p className='mt-1 text-gray-500 text-sm'>{doctorInfo.about}</p>
                    </div>
                    <p className='mt-4 text-gray-500 font-medium text-sm md:text-base'>
                        Appointment fee: <span className='text-gray-600'>{currencySymbol}{doctorInfo.fees}</span>
                    </p>
                </div>
            </div>

            <div className='mt-6 text-gray-700 font-medium'>
                <p className='text-base md:text-lg mb-2'>Booking slots</p>
                <div className='flex overflow-x-auto gap-3 md:gap-6 mt-4 items-center'>
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <div
                                onClick={() => setSlotIndex(index)}
                                className={`text-center py-3 px-4 rounded-full cursor-pointer min-w-[60px] ${index === slotIndex ? 'bg-primary text-white' : 'border border-gray-200'}`}
                                key={index}
                            >
                                <p className='text-sm'>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                <p className='text-sm'>{item[0] && item[0].dateTime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>

                <div className='flex items-center gap-3 overflow-x-auto mt-4 hide-scrollbar'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p
                            key={index}
                            onClick={() => setSlotTime(item.time)}
                            className={`text-sm flex-shrink-0 px-4 py-2 rounded-full cursor-pointer whitespace-nowrap ${item.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"}`}
                        >
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button onClick={() => bookAppointment()} className='bg-primary w-full md:w-auto text-white text-sm font-light px-14 py-3 rounded-full my-6'>
                    Book an appointment
                </button>
            </div>

            <RelatedDoctor docId={docId} speciality={doctorInfo.speciality} />
        </div>
    )
}

export default Appointment;
