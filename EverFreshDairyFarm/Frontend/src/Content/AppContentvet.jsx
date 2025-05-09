import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [NIC, setNIC] = useState(null);
  const [workexpirience, setWorkexpirience] = useState(null);

  const getUserData = async () => {
    const token = localStorage.getItem("vettoken");
    if (!token) {
      setId(null);
      setName(null);
      setEmail(null);
      setNIC(null);
      setWorkexpirience(null);
      return;
    }
    const parseToken = JSON.parse(token);

    try {
      const response = await axios.get(
        "http://localhost:8000/veterinarySurgeon/getUserData",
        {
          headers: {
            Authorization: `Bearer ${parseToken}`,
          },
        }
      );
      console.log(response);
      setId(response.data.user._id);
      setUserData(response.data.user);
      // Do something with response
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const login = (userInfo) => {
    setUserData({
      ...userInfo,
      role: userInfo.role || "vet", // Default to 'vet' if role is not provided
    });
  };

  const logout = () => {
    // Clear all state
    setUserData(null);
    setId(null);
    setName(null);
    setEmail(null);
    setIsLoggedin(false);
    
    // Remove token
    localStorage.removeItem("vettoken");
    
    // Don't navigate here
  };

  return (
    <AppContent.Provider
      value={{
        id,
        login,
        logout,
        isLoggedin,
        userData,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
