import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [id, setId] = useState(null);

  const getUserData = async () => {
    const token = localStorage.getItem("inventorytoken");
    if (!token) {
      setId(null);
      setUserData(null);
      return;
    }
    const parseToken = JSON.parse(token);

    try {
      const response = await axios.get(
        "http://localhost:8000/inventoryManager/getUserData",
        {
          headers: {
            Authorization: `Bearer ${parseToken}`,
          },
        }
      );
      setId(response.data.user._id);
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("inventoryUserData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("inventoryUserData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setIsLoggedin(true);
    }
  }, []);

  // Update the login function
  const login = (userInfo) => {
    setUserData(userInfo);
    setIsLoggedin(true);
    localStorage.setItem("inventoryUserData", JSON.stringify(userInfo));
  };

  const logout = () => {
    setUserData(null);
    setId(null);
    setIsLoggedin(false);
    localStorage.removeItem("inventorytoken");
    navigate("/");
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

