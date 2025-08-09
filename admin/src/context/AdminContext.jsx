import { createContext, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'




export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [token,setToken] = useState(localStorage.getItem('token')|| '')
    const [doctors, setDoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllDoctors = async () => {
    try {
        if (!token) {
            toast.error("Token is missing");
            return;
        }

        const resp = await axios.post(backendUrl + '/api/admin/all-doctors',{}, { headers: {token: token}});

        if (resp.data.success) {
            setDoctors(resp.data.doctors);
            console.log("Doctors fetched:", resp.data.doctors); 
        } else {
            toast.error("Failed to fetch doctors");
        }
    } catch (error) {
        console.error("❌ Error in getAllDoctors:", error);
        toast.error(error.response?.data?.message || "Internal Server Error");
    }
};

    const changeAvailability = async (docId) =>{
        try{
            const resp = await axios.post(backendUrl+'/api/admin/chage-availability', {docId}, {headers:{token:token}})
            if(resp.data.success){
                toast.success(resp.data.message);
                getAllDoctors();
            }
            else{
                toast.error(resp.data.message)
            }
        }
        catch(err){
            toast.error(err.message);
        }
    }


    const value = {
        token,setToken,backendUrl,doctors,getAllDoctors,changeAvailability
    }
    return (
        <AdminContext.Provider value={value}> 
        {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
