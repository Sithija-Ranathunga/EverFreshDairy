import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <nav className="bg-gray-100 p-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/">
          <img src="/images/logo.png" alt="Ever Fresh Dairy Logo" className="h-12 w-20"/>
        </a>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li><a href="#features" className="text-green hover:underline">Features</a></li>
          <li><a href="#about" className="text-green hover:underline">About</a></li>
          <li><a href="#contact" className="text-green hover:underline">Contact</a></li>
        </ul>

        {/* Login/Sign-In Dropdown */}
        <div className="relative z-50">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)} 
            className="bg-white text-[#2C3E50]-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Login / Sign In
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
              <ul className="py-2">
                <li><a href="/login-user" className="block px-4 py-2 hover:bg-gray-100">User Login</a></li>
                <li><a href="/login-admin" className="block px-4 py-2 hover:bg-gray-100">Admin Login</a></li>
                <li><a href="/login-farmer" className="block px-4 py-2 hover:bg-gray-100">Farmer Login</a></li>
                <hr />
                <li><a href="/signup-user" className="block px-4 py-2 hover:bg-gray-100">User Sign Up</a></li>
                <li><a href="/signup-farmer" className="block px-4 py-2 hover:bg-gray-100">Farmer Sign Up</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
