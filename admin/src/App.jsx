
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { AdminContext } from './context/AdminContext'
import Navbar from './component/Navbar'
import Dashboard from './pages/admin/Dashboard'
import AllAppointment from './pages/admin/AllAppointment'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorList from './pages/admin/DoctorList'
import SideBar from './component/SideBar'
import { DoctorContex } from './context/DoctorContext'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorProfile from './pages/doctor/DoctorProfile'
import DoctorAppointment from './pages/doctor/DoctorAppointment'

const App = () => {
  const { token } = useContext(AdminContext)
  const {dToken} = useContext(DoctorContex)

  return (
    <div>
      {token || dToken ? (
        <div>
          <Navbar />
          <div className="flex items-start">
            <SideBar />
            <Routes>
              {/* admin Routes */}
              <Route path='/' element={<></>}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/allAppointment" element={<AllAppointment />} />
              <Route path="/doctor-list" element={<DoctorList />} />
              
              {/* doctor Routes */}
              <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
              <Route path='/doctor-profile' element={<DoctorProfile/>} />
              <Route path='/doctor-appointment' element={<DoctorAppointment/>} />
            </Routes>
            <ToastContainer/>
          </div>
        </div>
      ) : (
        <>
          <Login />
          <ToastContainer />
        </>
      )}
    </div>
  )
}

export default App
