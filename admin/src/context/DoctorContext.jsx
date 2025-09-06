import { createContext, useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'




export const DoctorContex = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken')|| '');
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointments = async () =>{
        try{
            const resp = await axios.get(backendUrl+'/api/doctor/appointments', {headers:{dtoken:dToken}})
            if(resp.data.success){
                setAppointments(resp.data.appointments.reverse())
            }
            else{
                toast.error(resp.data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const completeAppointment = async(appointmentId) =>{
        try{
            const resp = await axios.post(backendUrl+'/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if(resp.data.success){
                toast.success(resp.data.message);
                getAppointments()
            }
            else{
                toast.error(resp.data.message)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }
     const cancelAppointment = async(appointmentId) =>{
        try{
            const resp = await axios.post(backendUrl+'/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if(resp.data.success){
                toast.success(resp.data.message);
                getAppointments()
            }
            else{
                toast.error(resp.data.message)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }
    const getDashData = async () =>{
        try{
            const resp = await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})
            if(resp.data.success){
                setDashData(resp.data.dashData)
                console.log(resp.data.dashData)
            }
            else{
                toast.error(resp.data.message)
            }
        }
         catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    const getProfileData = async ()=>{
        try{
            const resp = await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
            if(resp.data.success){
               setProfileData(resp.data.profileData)
               console.log(resp.data.profileData)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    const value = {
        dToken, setDToken, backendUrl, appointments, setAppointments, getAppointments, completeAppointment, cancelAppointment, dashData, setDashData, getDashData, getProfileData, profileData, setProfileData
    }
    
    return (
        <DoctorContex.Provider value={value}> 
        {props.children}
        </DoctorContex.Provider>
    )
}

export default DoctorContextProvider
