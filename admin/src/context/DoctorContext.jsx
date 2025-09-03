import { createContext, useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'




export const DoctorContex = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [dToken, setDToken] = useState(localStorage.getItem('dToken')|| '');
    const [appointments, setAppointments] = useState([])

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

    const value = {
        dToken, setDToken, backendUrl, appointments, setAppointments, getAppointments
    }
    
    return (
        <DoctorContex.Provider value={value}> 
        {props.children}
        </DoctorContex.Provider>
    )
}

export default DoctorContextProvider
