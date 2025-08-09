import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import {toast} from 'react-toastify'



export const AppContex = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(false)
    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const getAllDoctors = async ()=>{
       try{
         const resp = await axios.get(backendUrl + '/api/doctor/list');
        if(resp.data.success){
            console.log(resp.data)
            setDoctors(resp.data.doctors);
        }
        else{
            toast.error(resp.data.message)
        }
       }
       catch(err){
        console.log(err);
        toast.error(err.message)
       }
    }

    const loadUserProfileData = async (req, res)=>{
       try{
         const resp = await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
         if(resp.data.success){
            setUserData(resp.data.user);
         }
         else{
            toast.error(resp.data.message);
         }
       }
       catch(error){
        console.log(error);
        toast.error(error.message);
       }
    }

    useEffect(()=>{
        getAllDoctors()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
            setUserData(false);
        }
    },[token])

    const value = { doctors,currencySymbol, token, setToken, backendUrl, userData, setUserData, loadUserProfileData, getAllDoctors}
    return (
        <AppContex.Provider value={value}> 
        {props.children}
        </AppContex.Provider>
    )
}

export default AppContextProvider
