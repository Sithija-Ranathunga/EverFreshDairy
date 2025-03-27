import axios from "axios"
import { createContext, useState, useEffect } from "react"

export const AppContent = createContext()

export const AppContextProvider = (props)=>{

    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(false)


    const getAuthState = async ()=>{
        try{
           const {data} = await axios.post( 'http://localhost:8000/inventoryManager/is-auth')
           if(data.success){
            setIsLoggedin(true)
            getUserData()
           }
        }catch(error){
          console.log(error.message)
        }
    }

    const getUserData = async ()=> {
        try{
            const {data} = await axios.get('http://localhost:8000/inventoryManager')
            data.success ? setUserData(data.userData) : alert(error.message)
        }catch(error){
            alert(error.message);
        }
    }

    useEffect(()=>{
        getAuthState();
    },[]) 


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