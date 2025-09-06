import React, { useContext, useEffect } from "react";
import { DoctorContex } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContex } from "../../context/AppContext";

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContex);
  const { calculateAge, currency } = useContext(AppContex)

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full h-full">
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        All Appointments
      </h2>

      <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm md:text-base">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Payment</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
              <th className="py-3 px-4 text-left">Fees</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <tr key={appt._id} className="border-t text-sm md:text-base">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={appt.userData?.image || "/default-avatar.png"}
                      alt={appt.userData?.name}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    />
                    <span>{appt.userData?.name || "Unknown"}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 border border-gray-400 text-xs md:text-sm rounded-full">
                      {appt.payment ? 'Online' : 'CASH'}
                    </span>
                  </td>
                  <td className="py-3 px-4">{calculateAge(appt.userData.dob) || "-"}</td>
                  <td className="py-3 px-4">
                    {appt.slotDate
                      ? (() => {
                        const [day, month, year] = appt.slotDate.split("-").map(Number);
                        const fullYear = year;
                        const dateObj = new Date(fullYear, month - 1, day);

                        const formattedDate = dateObj.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        });
                        return `${formattedDate}, ${appt.slotTime}`;
                      })()
                      : "-"}
                  </td>
                  <td className="py-3 px-4"> {currency}{appt.amount || "-"}</td>
                  <td className="py-3 px-4 flex gap-2">
                    {
                      appt.cancelled ?
                        <p className='text-red-400 text-s font-medium'>Cancelled</p>
                        : appt.isCompleted
                          ? <p  className='text-green-400 text-s font-medium'>Completed</p>
                          : <div className="flex">
                            <img onClick={() => completeAppointment(appt._id)}  src={assets.tick_icon} />
                            <img onClick={() => cancelAppointment(appt._id)}  src={assets.cancel_icon} />
                          </div>
                    }

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;
