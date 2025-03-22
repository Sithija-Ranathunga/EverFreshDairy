
import React, { useState } from "react";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <h1 className="text-white text-2xl font-bold">Ever Fresh Dairy</h1>

        {/* Navigation Links */}
        <ul className="flex space-x-4">
          <li><a href="#features" className="text-white hover:underline">Features</a></li>
          <li><a href="#about" className="text-white hover:underline">About</a></li>
          <li><a href="#contact" className="text-white hover:underline">Contact</a></li>
        </ul>

        {/* Login/Sign-In Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)} 
            className="bg-white text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Login / Sign In ▼
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
