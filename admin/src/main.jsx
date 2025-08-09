import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminContextProvider from './context/AdminContext.jsx'
import DoctorContextProvider from './context/DoctorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <DoctorContextProvider>
      <AppContextProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
      </AppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>
)
