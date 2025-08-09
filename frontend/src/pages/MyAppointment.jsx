import React, { useContext, useEffect, useState } from 'react';
import { AppContex } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {
  const {backendUrl, token, currencySymbol } = useContext(AppContex);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointment = async () => {
    try {
      const resp = await axios.get(backendUrl + '/api/user/appointment', { headers: { token } });
      if (resp.data.success) {
        setAppointments(resp.data.appointment.reverse());
      } else {
        toast.error(resp.data.message || "Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.response?.data?.message);
    }
  };

  const cancelAppointment = async (appointmentId)=>{
    try{
        const resp = await axios.post(backendUrl+'/api/user/cancel-appointment', {appointmentId}, {headers:{token}});
        if(resp.data.success){
          toast.success(resp.data.message);
          getUserAppointment();
        }
        else{
           toast.error(resp.data.message)
        }
    }
    catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token]);

  return (
    <div className="px-4 py-8 md:px-20">
      <p className="text-xl font-semibold mb-6">My Appointments</p>
      <div className="space-y-6">
        {
          appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border rounded-lg shadow-sm">
                <div className="w-full md:w-1/5 flex justify-center">
                  <img src={item.docData.image} alt={item.docData.name} className="w-36 h-36 rounded-md object-cover bg-indigo-50" />
                </div>
                <div className="w-full md:w-3/5 flex flex-col gap-2 text-center md:text-left">
                  <div>
                    <p className="text-lg font-semibold">{item.docData.name}</p>
                    <p className="text-sm text-gray-600">{item.docData.speciality}</p>
                  </div>
                  <div>
               
                    <p className="text-sm text-gray-700">{item.docData.address?.line1}</p>
                    <p className="text-sm text-gray-700">{item.docData.address?.line2}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500"><span className="font-medium">Date & Time:</span> {item.slotDate} | {item.slotTime}</p>
                  
                    <p className="text-sm text-gray-500"><span className="font-medium">Appointment Fee:</span> {currencySymbol}{item.amount}</p>
                    <p className={`text-sm font-semibold ${item.isCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                        Status: {item.isCompleted ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-1/5 flex flex-col gap-2 items-center md:items-end">
                 {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="hover:bg-red-600 border border-gray-300 px-4 py-2 rounded-md text-sm w-full md:w-auto">Cancel appointment</button>} 
                 {!item.cancelled &&  <button className="bg-primary text-white md:px-12 px-4 py-2 rounded-md text-sm w-full md:w-auto">Pay Online</button>}
                 {item.cancelled && <button className="bg-red-600 text-white md:px-12 px-4 py-2 rounded-md text-sm w-full md:w-auto">Appointment Cancelled</button> }
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">You have no appointments yet.</p>
          )
        }
      </div>
    </div>
  );
};

export default MyAppointment;
