import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContex } from '../context/AppContext';

const NavBar = () => {
    const {token, setToken, userData} = useContext(AppContex);
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();

    const logout = ()=>{
        setToken('');
        localStorage.removeItem('token')
    }

    return (
        <div className="relative border-b border-gray-300 py-4 px-6 md:mx-24">
            <div className="flex justify-between items-center">
                <img
                    onClick={() => navigate('/')}
                    className="w-32 cursor-pointer"
                    src={assets.logo}
                    alt="Logo"
                />
                <div className="hidden md:flex gap-6 font-semibold">
                    <NavLink to="/">HOME</NavLink>
                    <NavLink to="/doctor">ALL DOCTORS</NavLink>
                    <NavLink to="/about">ABOUT</NavLink>
                    <NavLink to="/contact">CONTACT</NavLink>
                </div>
                <div className="hidden md:block">
                    {token && userData ?  (
                        <div
                            className="flex items-center gap-2 relative cursor-pointer"
                            onClick={() => setProfileOpen(!profileOpen)}
                        >
                            <img className="w-9 h-9 rounded-full" src={userData.image} />
                            <img className="w-3" src={assets.dropdown_icon} />
                            {profileOpen && (
                                <div className="absolute right-0 top-12 z-20 bg-stone-100 rounded min-w-48 gap-4 p-4 flex flex-col text-gray-600 shadow">
                                    <p onClick={() => navigate('/profile')} className='hover:text-black'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointment')} className='hover:text-black'>My Appointments</p>
                                    <p onClick={() => logout()} className='hover:text-black'>Log Out</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-primary text-white rounded-full px-4 py-2 font-semibold"
                        >
                            Create Account
                        </button>
                    )}
                </div>
                <div className="md:hidden relative flex items-center gap-3">
                    {token ? (
                        <img
                            onClick={() => { setProfileOpen(!profileOpen); setMenuOpen(false) }}
                            className="w-8 h-8 rounded-full cursor-pointer"
                            src={userData.image}
                        />
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="text-sm font-medium bg-primary text-white rounded-full px-2 py-1"
                        >
                            Sign In
                        </button>
                    )}
                    <button onClick={() => { setMenuOpen(!menuOpen); setProfileOpen(false) }} className="relative text-2xl font-bold">
                        ☰
                    </button>
                </div>
            </div>
            {menuOpen && (
                <div className="md:hidden absolute top-full right-4 mt-2 w-48 flex flex-col gap-4 font-semibold text-gray-700 bg-white p-4 rounded shadow z-50">

                    <NavLink to="/" onClick={() => setMenuOpen(false)}>HOME</NavLink>
                    <NavLink to="/doctor" onClick={() => setMenuOpen(false)}>ALL DOCTORS</NavLink>
                    <NavLink to="/about" onClick={() => setMenuOpen(false)}>ABOUT</NavLink>
                    <NavLink to="/contact" onClick={() => setMenuOpen(false)}>CONTACT</NavLink>
                </div>
            )}
            {profileOpen && token && (
                <div className="md:hidden absolute top-full right-14 mt-2 w-48 flex flex-col gap-4 bg-stone-100 text-gray-600 p-4 rounded shadow z-50">

                    <p onClick={() => { navigate('/profile'); setProfileOpen(false); }}>My Profile</p>
                    <p onClick={() => { navigate('/my-appointment'); setProfileOpen(false); }}>My Appointments</p>
                    <p onClick={() => { logout(); setProfileOpen(false); }}>Log Out</p>
                </div>
            )}
        </div>
    );
};

export default NavBar;
