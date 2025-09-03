import React from 'react'
import { useContext } from 'react'
import { DoctorContex } from '../../context/DoctorContext'
import { useEffect } from 'react'

const DoctorAppointment = () => {
  const {dToken, appointments, getAppointments} = useContext(DoctorContex)
  useEffect(()=>{
    if(dToken){
      getAppointments();
    }
  },[dToken])
  return (
    <div>
      doctor appointment
    </div>
  )
}

export default DoctorAppointment
