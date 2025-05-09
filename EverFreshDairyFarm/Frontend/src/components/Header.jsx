import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent as VetContent } from "../Content/AppContentvet";
import { AppContent as InventoryContent } from "../Content/AppContent";
import { AppContent as MilkingContent } from "../Content/AppContentMilking";
import { assets } from "../assets/assets";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Get all contexts
  const { userData: vetUserData, logout: vetLogout } = useContext(VetContent);
  const { userData: inventoryUserData, logout: inventoryLogout } =
    useContext(InventoryContent);
  const { userData: milkingUserData, logout: milkingLogout } =
    useContext(MilkingContent);

  // Debug logs to check what data is available
  console.log("Milking user data:", milkingUserData);
  console.log("Milking token exists:", !!localStorage.getItem("milkingtoken"));

  // Determine which user is logged in (priority: inventory > vet > milking)
  const userData = inventoryUserData || vetUserData || milkingUserData;
  const logout = inventoryUserData
    ? inventoryLogout
    : vetUserData
    ? vetLogout
    : milkingUserData
    ? milkingLogout
    : () => {};

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear all tokens
    localStorage.removeItem("vettoken");
    localStorage.removeItem("milkingtoken");
    localStorage.removeItem("inventorytoken");
    localStorage.removeItem("inventoryUserData");
    localStorage.removeItem("milkingUserData"); // Add this line

    // Call appropriate logout
    logout();

    // Navigate to home
    navigate("/");

    // Close dropdown
    setProfileDropdown(false);
  };

  const handleDashboardClick = () => {
    const inventoryToken = localStorage.getItem("inventorytoken");
    const vetToken = localStorage.getItem("vettoken");
    const milkingToken = localStorage.getItem("milkingtoken");

    if (inventoryToken) {
      navigate("/inventory");
    } else if (vetToken) {
      navigate("/Registry");
    } else if (milkingToken) {
      navigate("/milkingdata");
    }
    setProfileDropdown(false);
  };

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="Ever Fresh Dairy Logo"
            className="w-20 h-12 object-contain"
          />
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <a
              href="#features"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </li>
        </ul>

        {/* Auth Area */}
        {userData ? (
          <div className="flex items-center gap-2 relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-3 cursor-pointer rounded-full pl-2 pr-3 py-1.5 hover:bg-gray-100 transition-all duration-300 group"
              onClick={() => setProfileDropdown(!profileDropdown)}
            >
              {/* Avatar with animation */}
              <div className="relative">
                <img
                  className="w-9 h-9 rounded-full object-cover border-2 border-green-500 shadow-md transform transition-transform duration-300 group-hover:scale-105"
                  src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid"
                  alt="Profile"
                />
                <div className="absolute top-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
              </div>

              {/* Username with hover effect */}
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-800 transition-colors duration-300 group-hover:text-green-700">
                  Hi, {userData.name || "User"}
                </div>
                <svg
                  className={`ml-1 h-4 w-4 text-gray-500 transition-transform duration-300 ${
                    profileDropdown ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Dropdown Menu with Animation */}
            {profileDropdown && (
              <div
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50 transform origin-top-right transition-all duration-200 opacity-0 translate-y-2"
                onAnimationEnd={() => {
                  const dropdown =
                    dropdownRef.current?.querySelector(".animate-fadeIn");
                  if (dropdown)
                    dropdown.classList.remove("opacity-0", "translate-y-2");
                }}
                style={{ animation: "fadeIn 0.3s ease-out forwards" }}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {userData.email || "user@example.com"}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDashboardClick();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 flex items-center transition-colors duration-150"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Dashboard
                </button>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center transition-colors duration-150"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm9 9a1 1 0 01-1 1H8a1 1 0 010-2h3V8.414l-1.293 1.293a1 1 0 11-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 8.414V10a1 1 0 01-1 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative z-50">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 border border-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Login / Sign In</span>
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 w-56 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl py-1 opacity-0 translate-y-2"
                style={{ animation: "fadeIn 0.3s ease-out forwards" }}
              >
                <ul className="py-1">
                  <li>
                    <a
                      href="/MLogin"
                      className="flex items-center px-4 py-2.5 hover:bg-gray-50 transition duration-150"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2.5"></span>
                      <span className="text-sm">Milking Manager Login</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/VetLogin"
                      className="flex items-center px-4 py-2.5 hover:bg-gray-50 transition duration-150"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2.5"></span>
                      <span className="text-sm">Veterinary Surgeon Login</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/loginInventory"
                      className="flex items-center px-4 py-2.5 hover:bg-gray-50 transition duration-150"
                    >
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2.5"></span>
                      <span className="text-sm">Inventory Manager Login</span>
                    </a>
                  </li>
                  <div className="border-t border-gray-100 my-1"></div>
                  <li>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2.5 hover:bg-gray-50 transition duration-150"
                    >
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2.5"></span>
                      <span className="text-sm">Admin login</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
