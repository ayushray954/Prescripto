// App.jsx
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

const App = () => {
  const { token } = useContext(AdminContext)

  return (
    <div>
      {token ? (
        <div>
          <Navbar />
          <div className="flex items-start">
            <SideBar />
            <Routes>
              <Route path='/' element={<></>}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/allAppointment" element={<AllAppointment />} />
              <Route path="/doctor-list" element={<DoctorList />} />
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
