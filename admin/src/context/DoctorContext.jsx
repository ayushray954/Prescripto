import { createContext } from "react"




export const DoctorContex = createContext();

const DoctorContextProvider = (props) => {
    
    return (
        <DoctorContex.Provider> 
        {props.children}
        </DoctorContex.Provider>
    )
}

export default DoctorContextProvider
