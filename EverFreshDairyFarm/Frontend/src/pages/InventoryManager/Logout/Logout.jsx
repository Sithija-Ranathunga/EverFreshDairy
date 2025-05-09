import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../../Content/AppContent";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast library

function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(AppContent);

  const confirmLogout = async () => {
    try {
      // Set withCredentials for cookies to be sent with request
      axios.defaults.withCredentials = true;

      // Make the logout request
      const { data } = await axios.post(
        "http://Localhost:8000/inventoryManager/logout"
      );

      // Call the context logout function to update app state
      logout();

      // Clear any tokens manually to ensure logout
      localStorage.removeItem("inventorytoken");
      localStorage.removeItem("inventoryUserData");

      // Show success message
      toast.success("Logged out successfully");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || "Error logging out");

      // Even if there's an error, force logout on client side
      localStorage.removeItem("inventorytoken");
      localStorage.removeItem("inventoryUserData");
      navigate("/");
    }
  };

  const cancelLogout = () => {
    navigate("/grassing");
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
