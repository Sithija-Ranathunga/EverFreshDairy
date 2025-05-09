import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../../Content/AppContentvet";
import axios from "axios";
import { toast } from "react-toastify";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AppContent);

  const confirmLogout = async () => {
    try {
      // First, clear all local tokens
      localStorage.removeItem("vettoken");

      // Set a flag to indicate we're in the logout process
      // This helps prevent fetching user data during logout
      sessionStorage.setItem("loggingOut", "true");

      // Call context logout to update app state
      if (typeof logout === "function") {
        logout();
      }

      // Try to call the API logout
      try {
        axios.defaults.withCredentials = true;
        await axios.post("http://Localhost:8000/veterinarySurgeon/logout");
      } catch (apiError) {
        console.error("API logout failed:", apiError);
        // Continue even if API fails
      }

      // Show success message
      toast.success("Logged out successfully");

      // Force a complete page reload to reset all app state
      window.location.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect on error
      window.location.replace("/");
    }
  };

  const cancelLogout = () => {
    navigate("/Registry");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="p-6 text-center bg-white shadow-xl rounded-2xl w-80">
          <h2 className="mb-4 text-lg font-semibold">Confirm Logout</h2>
          <p className="mb-6">Are you sure you want to logout?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={confirmLogout}
              className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={cancelLogout}
              className="px-4 py-2 text-black bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
