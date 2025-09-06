import React, { useContext, useEffect } from "react";
import { DoctorContex } from "../../context/DoctorContext";
import { AppContex } from "../../context/AppContext";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

const DoctorProfile = () => {
  const { dToken, profileData, getProfileData, setProfileData,backendUrl } = useContext(DoctorContex);
  const { currency } = useContext(AppContex);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async ()=>{
    try{

    const updateData = {
    address: profileData.address,
    fees: profileData.fees,
    available:profileData.available
  }

  const resp = await axios.post(backendUrl+'/api/doctor/update-profile', updateData, {headers:{dToken}})
  if(resp.data.success){
    toast.success(resp.data.message)
    setIsEdit(false)
    getProfileData()
  }
  else{
    toast.error(resp.data.message)
  }
 }
    catch(error){
      console.log(error);
      toast.error(error.message)
    }
  }

  

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return <p className="text-center text-gray-500 mt-10">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-start gap-8 p-6 bg-gray-50 min-h-screen">
      {/* Left Side - Doctor Image */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <img
          src={profileData.image}
          alt={profileData.name}
          className="w-64 h-64 rounded-2xl object-cover shadow-md"
        />
      </div>

      {/* Right Side - Doctor Details */}
      <div className="flex-1 bg-white shadow rounded-2xl p-6">
        {/* Doctor Name and Qualification */}
        <h2 className="text-2xl font-semibold">{profileData.name}</h2>
        <p className="text-gray-600 mt-1">
          {profileData.degree} - {profileData.speciality}
        </p>

        <span className="inline-block bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full mt-2">
          {profileData.experience}
        </span>

        {/* About Section */}
        <div className="mt-6">
          <h3 className="font-semibold text-lg">About:</h3>
          <p className="text-gray-600 mt-2 leading-relaxed">{profileData.about}</p>
        </div>

        {/* Appointment Fee */}
        <div className="mt-6">
          <p className="font-semibold">
            Appointment fee:{" "}
            <span className="text-gray-700">
              {currency}
              {isEdit ? <input type='number' onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value }))} value={profileData.fees}/> :  profileData.fees}
            </span>
          </p>
        </div>

        {/* Address */}
        <div className="mt-4">
          <h3 className="font-semibold">Address:</h3>
          <p className="text-gray-600">{isEdit ? <input type='text' onChange={(e)=>setProfileData(prev => ({...prev, address:{...prev.address,line1: e.target.value}}))} value={profileData.address.line1}/>:profileData.address.line1}</p>
          <p className="text-gray-600">{isEdit ? <input type='text' onChange={(e)=>setProfileData(prev => ({...prev, address:{...prev.address,line2: e.target.value}}))} value={profileData.address.line2}/>:profileData.address.line2}</p>
        </div>

        {/* Availability */}
        <div className="mt-4 flex items-center gap-2">
         <input  onChange={()=>isEdit && setProfileData(prev => ({...prev, available: !prev.available }))} value={profileData.fees} checked={profileData.available} type="checkbox" />
         <label htmlFor="">Available</label>
        </div>

        {/* Edit Button */}
        <div className="mt-6">
          {
            isEdit
              ? <button onClick={updateProfile} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">Save</button>
              :<button onClick={()=>setIsEdit(true)} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition">Edit</button>
          }
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

