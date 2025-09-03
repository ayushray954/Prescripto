import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContex } from '../context/DoctorContext';

const Navbar = () => {
  const { token, setToken } = useContext(AdminContext);
  const {dToken, setDToken} = useContext(DoctorContex)
  const navigate = useNavigate();

  const logout = () => {
    if (token) {
        navigate('/')
      setToken('');
      localStorage.removeItem('token');
    }
    else {
       navigate('/')
      setDToken('');
      localStorage.removeItem('dToken');
    }
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt='Admin Logo' />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 hidden md:block'>{token ? "Admin":"Doctor"}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-md'>Logout</button>
    </div>
  );
};

export default Navbar;
