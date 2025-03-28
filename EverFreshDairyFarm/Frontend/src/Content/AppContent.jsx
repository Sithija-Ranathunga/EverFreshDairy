import axios from "axios"
<<<<<<< Updated upstream
import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
=======
import { createContext, useEffect, useState } from "react"
>>>>>>> Stashed changes

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null);
    const [id, setId] = useState(null);
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const [NIC,setNIC] = useState(null);
    const [workexpirience,setWorkexpirience] = useState(null);

<<<<<<< Updated upstream
    const getUserData = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setId(null);
            setName(null);
            setEmail(null);
            setNIC(null);
            setWorkexpirience(null);
            return;
=======
    const getAuthState = async ()=>{
        try{
            const {data} = await axios.get('http://localhost:8000/inventoryManager/is-auth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }

        }catch(error){
            alert(error.message)
        }
    }

    const getUserData = async ()=> {
        try{
            const {data} = await axios.get('http://localhost:8000/inventoryManager')
            data.success ? setUserData(data.userData) : alert(error.message)
        }catch(error){
            alert(error.message);
>>>>>>> Stashed changes
        }
        const parseToken = JSON.parse(token);

<<<<<<< Updated upstream
        try {
            const response = await axios.get("http://localhost:8000/inventoryManager/getcurrentuser", {
                headers: {
                    Authorization: `Bearer ${parseToken}`,
                },
            });
            console.log(response)
            setId(response.data._id)
            setUserData(response.data)
            // Do something with response
        } catch (error) {
            console.error("Error fetching current user:", error);
        }
=======
    useEffect(()=>{
        getAuthState();
    },[])

>>>>>>> Stashed changes

    };

    useEffect(() => {
        getUserData();
    }, []);

    const login = async () => {
        await getUserData();
    };

    const logout = () => {
      setId(null);
        localStorage.removeItem("accessToken");
        navigate('/')
    };

    return (
        <AppContent.Provider value={{
            
            id,
            login,
            logout,
            isLoggedin,
            userData
        }}>
            {children}
        </AppContent.Provider>
    );
};
