import axios from "axios";
import { useState } from "react";
import { createContext } from "react"
import { toast } from "react-toastify";




export const AppContex = createContext();

const AppContextProvider = (props) => {

    const currency = '$'

    const calculateAge = (dob) => {
    if (!dob) return "-";
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear()-birthDate.getFullYear();
    return age;
  };
  const value = {
    calculateAge, currency
  }
   
    return (
        <AppContex.Provider value={value}> 
        {props.children}
        </AppContex.Provider>
    )
}

export default AppContextProvider
