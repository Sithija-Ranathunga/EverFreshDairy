import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [id, setId] = useState(null);

  const getUserData = async () => {
    try {
      // Check if token exists
      const token = localStorage.getItem("milkingtoken");

      if (!token) {
        console.log("No milking token found");
        setIsLoggedin(false);
        setUserData(null);
        return;
      }

      // Try to use cached data first
      const cachedData = localStorage.getItem("milkingUserData");
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          // Set login state from cache while we fetch fresh data
          setIsLoggedin(true);
          setUserData(parsedData);
          setId(parsedData.id);
          console.log("Using cached milking user data");
        } catch (parseError) {
          console.error("Error parsing cached data:", parseError);
        }
      }

      console.log("Fetching milking user data with token:", token);

      // Configure axios for the API request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 5000, // 5 second timeout
      };

      if (authCheck.data && authCheck.data.success) {
        // If authenticated, get user data
        try {
          // The getUserData endpoint requires authentication
          const response = await axios.get(
            "http://Localhost:8000/milkingManager/getUserData",
            config
          );

          // Update state with fresh data
          setIsLoggedin(true);
          setUserData(response.data);
          setId(response.data._id);

          // Update cache with fresh data
          localStorage.setItem(
            "milkingUserData",
            JSON.stringify(response.data)
          );
        } catch (userError) {
          console.error("Error fetching user details:", userError);
          // We'll keep using the cached data set earlier
        }
      } else {
        console.log("Authentication check failed");
        setIsLoggedin(false);
        setUserData(null);
        localStorage.removeItem("milkingtoken");
        localStorage.removeItem("milkingUserData");
      }
    } catch (error) {
      // Don't clear user data on network errors if we have cached data
      const cachedData = localStorage.getItem("milkingUserData");
      const token = localStorage.getItem("milkingtoken");

      if (!cachedData || !token) {
        setIsLoggedin(false);
        setUserData(null);
      }

      // Only remove token on auth errors (401), not on network errors
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("milkingtoken");
        localStorage.removeItem("milkingUserData");
      }
    }
  };

  // Call getUserData on component mount
  useEffect(() => {
    getUserData();
  }, []);

  // Add this effect to detect token removal
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("milkingtoken");
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

  const login = (userInfo) => {
    setUserData(userInfo);
    setIsLoggedin(true);
    setId(userInfo.id);

    // Cache user data
    localStorage.setItem("milkingUserData", JSON.stringify(userInfo));
  };

  const logout = () => {
    // Clear state
    setIsLoggedin(false);
    setUserData(null);
    setId(null);

    // Clear local storage
    localStorage.removeItem("milkingtoken");
    localStorage.removeItem("milkingUserData");

    // Don't navigate here - let Header.jsx handle it
  };

  return (
    <AppContent.Provider
      value={{
        isLoggedin,
        userData,
        id,
        login,
        logout,
        getUserData,
      }}
    >
      {children}
    </AppContent.Provider>
  );
};
