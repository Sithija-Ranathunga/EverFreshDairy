import React from "react";
import { assets } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";

function InventorySideBar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-full">
      <div className="flex flex-col h-full bg-gradient-to-b from-green-700 to-green-900 text-white shadow-xl rounded-xl overflow-hidden w-64 transition-all duration-300">
        {/* Header */}
        <div className="px-6 py-5 bg-green-800 border-b border-green-600">
          <h2 className="text-lg font-bold">Inventory Management</h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col flex-grow px-4 py-5 space-y-1">
          {/* Dashboard */}
          <Link
            to="/grassing"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out ${
              isActive("/grassing")
                ? "bg-green-600 text-white shadow-md"
                : "text-green-100 hover:bg-green-600/50"
            }`}
          >
            <img className="w-5 h-5 mr-3" src={assets.dashboard_icon} alt="" />
            <span className="font-medium">Dashboard</span>
            {isActive("/grassing") && (
              <span className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </Link>

          {/* Session */}
          <Link
            to="/session"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out ${
              isActive("/session")
                ? "bg-green-600 text-white shadow-md"
                : "text-green-100 hover:bg-green-600/50"
            }`}
          >
            <img className="w-5 h-5 mr-3" src={assets.session_icon} alt="" />
            <span className="font-medium">Session</span>
            {isActive("/session") && (
              <span className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </Link>

          {/* Report */}
          <Link
            to="/report"
            className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out ${
              isActive("/report")
                ? "bg-green-600 text-white shadow-md"
                : "text-green-100 hover:bg-green-600/50"
            }`}
          >
            <img className="w-5 h-5 mr-3" src={assets.report_icon} alt="" />
            <span className="font-medium">Report</span>
            {isActive("/report") && (
              <span className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </Link>

          {/* Profile - at the bottom */}
          <div className="mt-auto pt-6 border-t border-green-600">
            <Link
              to="/inventory"
              className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out ${
                isActive("/inventory")
                  ? "bg-green-600 text-white shadow-md"
                  : "text-green-100 hover:bg-green-600/50"
              }`}
            >
              <img className="w-5 h-5 mr-3" src={assets.profile_icon} alt="" />
              <span className="font-medium">Profile</span>
              {isActive("/inventory") && (
                <span className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default InventorySideBar;
