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

      // Before making API calls, try to use cached data first
      const cachedData = localStorage.getItem("milkingUserData");
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setIsLoggedin(true);
          setUserData(parsedData);
          setId(parsedData.id);

          // Continue with API call in the background to refresh data
        } catch (parseError) {
          console.error("Error parsing cached data:", parseError);
          // Continue with API call
        }
      }

      // Configure request headers
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // First verify the token is valid
      try {
        console.log("Verifying token...");
        const authCheck = await axios.get(
          "http://Localhost:8000/milkingManager/verifyToken",
          config
        );
        console.log("Auth check response:", authCheck.data);

        if (authCheck.data && authCheck.data.success) {
          // If authenticated, get user data
          try {
            // Use the getUserData endpoint that requires authentication
            const { data } = await axios.get(
              "http://Localhost:8000/milkingManager/getUserData",
              config
            );

            // Note: The getUserData endpoint returns the user object directly
            if (data) {
              setIsLoggedin(true);
              setUserData(data);
              setId(data._id);

              // Update cache with fresh data
              localStorage.setItem("milkingUserData", JSON.stringify(data));
            }
          } catch (userError) {
            console.error("Error getting user data:", userError);
            // We already loaded cached data, so no need to do anything here
          }
        } else {
          // Only clear if we didn't successfully load from cache earlier
          if (!cachedData) {
            setIsLoggedin(false);
            setUserData(null);
            localStorage.removeItem("milkingtoken");
          }
        }
      } catch (authError) {
        console.error("Token verification failed:", authError);
        // Don't clear user data here if we have cached data
      }
    } catch (error) {
      console.error("getUserData error:", error);
      // Don't clear user data here if we have cached data
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
