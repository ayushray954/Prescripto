import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContex } from "../../context/AppContext";
import {assets} from '../../assets/assets'

const AllAppointment = () => {
  const { appointments, getAppointments, token, cancelAppointment } = useContext(AdminContext);
  const {calculateAge, currency} = useContext(AppContex)

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  return (
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-4">All Appointments</h2>
<div className="hidden sm:grid grid-cols-8 gap-6 p-3 bg-gray-100 font-medium text-gray-600 text-center">
  <p>#</p>
  <p>Patient</p>
  <p>Age</p>
  <p>Date & Time</p>
  <p>Department</p>
  <p>Doctor</p>
  <p>Fees</p>
  <p>Actions</p>
</div>

{appointments?.map((item, index) => (
  <div
    key={index}
    className="flex flex-wrap justify-between sm:grid sm:grid-cols-8 gap-6 items-center p-3 border-b text-center"
  >
    <p className="max-sm:hidden">{index + 1}</p>
    <div className="flex items-center justify-center gap-3">
      <img
        className="w-8 h-8 rounded-full"
        src={item.userData.image}
        alt={item.userData.name}
      />
      <p>{item.userData.name}</p>
    </div>

    <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

    <p className="mx-2">{item.slotDate}, {item.slotTime}</p>

    <p>{item.docData.speciality}</p>

    <div className="flex items-center justify-center gap-3">
      <img
        className="w-8 h-8 rounded-full"
        src={item.docData.image}
        alt={item.docData.name}
      />
      <p>{item.docData.name}</p>
    </div>

    <p className="font-semibold">{item.amount} {currency}</p>
    {
      item.cancelled ? 
      <p className="text-red-500">Cancelled</p>:
      <button onClick={()=>cancelAppointment(item._id)} className="text-red-500 hover:text-red-700 font-bold text-lg ml-10">
      <img src={assets.cancel_icon}/>
    </button>
    }
  </div>
))}

    </div>
  );
};

export default AllAppointment;
