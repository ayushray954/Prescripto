import { createContext } from "react"




export const AppContex = createContext();

const AppContextProvider = (props) => {
   
    return (
        <AppContex.Provider> 
        {props.children}
        </AppContex.Provider>
    )
}

export default AppContextProvider
