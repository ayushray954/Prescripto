import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { token, dashData, getDashboard, cancelAppointment } = useContext(AdminContext);

  useEffect(() => {
    if (token) {
      getDashboard();
    }
  }, [token]);

  return (
    <div className="flex-1 p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4">
          <img src={assets.doctor_icon} alt="Doctors" className="w-12 h-12" />
          <div>
            <p className="text-gray-600 text-sm">Doctors</p>
            <h2 className="text-xl font-semibold">{dashData?.doctors || 0}</h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4">
          <img src={assets.appointment_icon} alt="Appointments" className="w-12 h-12" />
          <div>
            <p className="text-gray-600 text-sm">Appointments</p>
            <h2 className="text-xl font-semibold">{dashData?.appointments || 0}</h2>
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4">
          <img src={assets.patients_icon} alt="Patients" className="w-12 h-12" />
          <div>
            <p className="text-gray-600 text-sm">Patients</p>
            <h2 className="text-xl font-semibold">{dashData?.patient || 0}</h2>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Latest Appointment</h3>
        <div className="space-y-4">
          {dashData?.latestAppointment?.length > 0 ? (
            dashData.latestAppointment.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={item?.docData?.image}
                    alt={item?.docData?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{item?.docData?.name}</p>
                    <p className="text-gray-500 text-sm">
                      Booking on {item.slotDate}
                    </p>
                  </div>
                </div>
                {
                  item.cancelled ?
                    <p className="text-red-500">Cancelled</p> :
                    <button onClick={() => cancelAppointment(item._id)} className="text-red-500 hover:text-red-700 font-bold text-lg ml-10">
                      <img src={assets.cancel_icon} />
                    </button>
                }
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent appointments</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
