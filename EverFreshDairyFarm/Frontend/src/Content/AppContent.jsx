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
    try {
      const token = localStorage.getItem("inventorytoken");

      if (!token) {
        console.log("No inventory token found");
        setIsLoggedin(false);
        setUserData(null);
        return;
      }

      console.log("Fetching inventory user data with token:", token);

      // Set up request with token in Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (authCheck.data && authCheck.data.success) {
        // If authentication check passes, get user profile data
        // The backend expects userId in the request body
        const userId = JSON.parse(atob(token.split(".")[1])).id;

        const { data: profileResponse } = await axios.post(
          "http://Localhost:8000/inventoryManager/profile",
          { userId },
          config
        );

        if (profileResponse.success && profileResponse.user) {
          setIsLoggedin(true);
          setUserData(profileResponse.user);
          setId(profileResponse.user._id);
        } else {
          setIsLoggedin(false);
          setUserData(null);
        }
      } else {
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("inventorytoken");
      }
    } catch (error) {
      // Use cached user data if available
      const cachedUserData = localStorage.getItem("inventoryUserData");
      if (cachedUserData) {
        try {
          const parsedData = JSON.parse(cachedUserData);
          setIsLoggedin(true);
          setUserData(parsedData);
          setId(parsedData.id);
          return;
        } catch (e) {
          console.error("Error parsing cached data:", e);
        }
      }

      // If API call fails and no cache, clear login state
      setIsLoggedin(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    const loggingOut = sessionStorage.getItem("loggingOut");
    if (!loggingOut) {
      getUserData();
    }

    // Clean up the logging out flag after the effect runs
    return () => {
      sessionStorage.removeItem("loggingOut");
    };
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("inventoryUserData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setIsLoggedin(true);
    }
  }, []);

  //Test

  useEffect(() => {
    const storedUserData = localStorage.getItem("inventoryUserData");
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setIsLoggedin(true);
    }
  }, []);

  // Add this effect to detect token removal
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("inventorytoken");
      if (!token && isLoggedin) {
        // Token was removed but state still shows logged in
        setIsLoggedin(false);
        setUserData(null);
        setId(null);
      }
    };

    // Check on mount and when storage changes
    checkToken();
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, [isLoggedin]);

  // Update the login function
  const login = (userInfo) => {
    setUserData(userInfo);
    setIsLoggedin(true);
    localStorage.setItem("inventoryUserData", JSON.stringify(userInfo));
  };

  const logout = () => {
    // Clear application state
    setUserData(null);
    setId(null);
    setIsLoggedin(false);

    // Clear localStorage
    localStorage.removeItem("inventorytoken");
    localStorage.removeItem("inventoryUserData");

    // Don't navigate here - instead, dispatch an event that the Header can listen for
    window.dispatchEvent(new Event("logout"));

    // Force a refresh of localStorage to ensure other components notice the change
    localStorage.setItem("_logout_timestamp", Date.now().toString());
    localStorage.removeItem("_logout_timestamp");
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
