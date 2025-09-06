import React, { useContext, useEffect } from "react";
import { DoctorContex } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContex } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContex);
  const { currency } = useContext(AppContex);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="flex-1 p-6">
        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Earnings */}
          <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.earning_icon} alt="Earnings" className="w-12 h-12" />
            <div>
              <p className="text-gray-600 text-sm">Earnings</p>
              <h2 className="text-xl font-semibold">
                {currency}{dashData?.earning || 0}
              </h2>
            </div>
          </div>

          {/* Appointments */}
          <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.appointment_icon} alt="Appointments" className="w-12 h-12" />
            <div>
              <p className="text-gray-600 text-sm">Appointments</p>
              <h2 className="text-xl font-semibold">
                {dashData?.appointments || 0}
              </h2>
            </div>
          </div>

          {/* Patients */}
          <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4 hover:shadow-md transition">
            <img src={assets.patients_icon} alt="Patients" className="w-12 h-12" />
            <div>
              <p className="text-gray-600 text-sm">Patients</p>
              <h2 className="text-xl font-semibold">{dashData?.patients || 0}</h2>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Latest Appointments</h3>
          <div className="space-y-4">
            {dashData?.latestAppointment?.length > 0 ? (
              dashData.latestAppointment.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={item?.userData?.image}
                      alt={item?.userData?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{item?.userData?.name}</p>
                      <p className="text-gray-500 text-sm">
                        Booking on {item.slotDate}, {item.slotTime}
                      </p>
                    </div>
                  </div>
                  {item.cancelled ? (
                    <p className="text-red-400 text-sm font-medium">Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className="text-green-400 text-sm font-medium">Completed</p>
                  ) : (
                    <div className="flex gap-2">
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Complete"
                        className="w-6 h-6 cursor-pointer"
                      />
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 h-6 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent appointments</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
