import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AppContent as VetContent } from "../Content/AppContentvet";
import { AppContent as InventoryContent } from "../Content/AppContent";
import { assets } from "../assets/assets";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Get both contexts
  const { userData: vetUserData, logout: vetLogout } = useContext(VetContent);
  const { userData: inventoryUserData, logout: inventoryLogout } = useContext(InventoryContent);
  
  // Determine which user is logged in
  const userData = inventoryUserData || vetUserData;
  const logout = inventoryUserData ? inventoryLogout : vetLogout;

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
    
    if (inventoryToken) {
      navigate('/inventory');
    } else if (vetToken) {
      navigate('/Registry');
    }
    setProfileDropdown(false);
  };

  return (
    <nav className="bg-white p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/">
          <img
            src="/images/logo.png"
            alt="Ever Fresh Dairy Logo"
            className="w-20 h-12"
          />
        </a>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li>
            <a href="#features" className="text-green hover:underline">
              Features
            </a>
          </li>
          <li>
            <a href="#about" className="text-green hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="text-green hover:underline">
              Contact
            </a>
          </li>
        </ul>

        {/* User Profile Section */}
        {userData ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors"
              onMouseEnter={() => setProfileDropdown(true)}
              role="button"
              tabIndex={0}
            >
              <img 
                className="w-8 h-8 rounded-full object-cover"
                src="https://img.freepik.com/premium-vector/person-avatar-design-illustration-gestures-account-social-media-man_24877-18271.jpg"
                alt="Profile"
              />
              <span className="text-sm font-medium text-gray-800">
                Hi, {userData.name}
              </span>
            </div>

            {/* Profile Dropdown */}
            {profileDropdown && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2"
                onMouseLeave={() => setProfileDropdown(false)}
              >
                <button
                  onClick={handleDashboardClick}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative z-50">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white text-[#2C3E50] px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
              Login / Sign In
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-2">
                  <li>
                    <a
                      href="/MLogin"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Milking Manager Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/VetLogin"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Veterinary Surgeon Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/loginInventory"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Inventory Manager Login
                    </a>
                  </li>
                  <hr />
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Admin login
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