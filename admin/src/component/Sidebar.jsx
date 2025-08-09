import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'

const SideBar = () => {
  const { token } = useContext(AdminContext)
  const [isOpen, setIsOpen] = useState(false)

  if (!token) return null

  const handleLinkClick = () => {
    // Auto-close sidebar on mobile
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Topbar with Toggle */}
      <div className="md:hidden bg-white p-4 flex justify-between items-center shadow">
        <p className="text-lg font-semibold text-[#333]">Admin Panel</p>
        <button onClick={() => setIsOpen(!isOpen)}>
          {/* Simple Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          bg-white min-h-screen w-64 shadow-md border-r text-[#515151]
          fixed md:static top-0 left-0 z-50 transform
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:flex md:flex-col
        `}
      >
        <ul className="flex flex-col gap-2 mt-5">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 ${
                isActive ? 'bg-[#F0F1F3]' : ''
              }`
            }
            onClick={handleLinkClick}
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/allAppointment"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 ${
                isActive ? 'bg-[#F0F1F3]' : ''
              }`
            }
            onClick={handleLinkClick}
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 ${
                isActive ? 'bg-[#F0F1F3]' : ''
              }`
            }
            onClick={handleLinkClick}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 ${
                isActive ? 'bg-[#F0F1F3]' : ''
              }`
            }
            onClick={handleLinkClick}
          >
            <img src={assets.people_icon} alt="" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      </div>
    </>
  )
}

export default SideBar
