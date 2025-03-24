import axios from "axios"
import { createContext, useState } from "react"

export const AppContent = createContext()

export const AppContextProvider = (props)=>{

    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getUserData = async ()=> {
        try{
            const {data} = await axios.get('http://localhost:8000/inventoryManager')
            data.success ? setUserData(data.userData) : alert(error.message)
        }catch(error){
            alert(error.message);
        }
    }


    const value = {
          isLoggedin, setIsLoggedin,
          userData, setUserData,
          getUserData
    }

    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}