
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctor from './pages/Doctor'
import Login from './pages/Login'
import Profile from './pages/Profile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';


const router  = createBrowserRouter([
  {
    path:'/',
    element:<div>
      <NavBar/>
      <Home/>
      <Footer/>
    </div>
  },

  {
    path:'/about',
    element:<div>
      <NavBar/>
      <About/>
      <Footer/>
    </div>
  },

  {
    path:'/contact',
    element:<div>
      <NavBar/>
      <Contact/>
      <Footer/>
    </div>
  },

  {
    path:'/doctor',
    element:<div>
      <NavBar/>
      <Doctor/>
      <Footer/>
    </div>
  },

  {
    path:'/doctor/:speciality',
    element:<div>
      <NavBar/>
      <Doctor/>
      <Footer/>
    </div>
  },

  {
    path:'/login',
    element:<div>
      <NavBar/>
      <Login/>
      <Footer/>
    </div>
  },

  {
    path:'/profile',
    element:<div>
      <NavBar/>
      <Profile/>
      <Footer/>
    </div>
  },

  {
    path:'/my-appointment',
    element:<div>
      <NavBar/>
      <MyAppointment/>
      <Footer/>
    </div>
  },

  {
    path:'/appointment/:docId',
    element:<div>
      <NavBar/>
      <Appointment/>
      <Footer/>
    </div>
  },
])

function App() {
  return (
   <div>
     <ToastContainer/>
    <RouterProvider router={router}/>
   </div>
  )
}

export default App
