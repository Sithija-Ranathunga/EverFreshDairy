import React, { useContext, useState } from "react";
import { AppContent } from "../Content/AppContent";

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {userData} = useContext(AppContent);

  return (
    <nav className="relative z-50 p-4 bg-gray-200 shadow-md">
      <div className="container flex items-center justify-between mx-auto">
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
        
  


        {userData ? (
          <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative">
          {userData.name[0].toUpperCase()}
          </div>
      ) : ( 
          <div>
            <div className="relative z-50">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-white text-[#2C3E50]-600 px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
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
          </div>
          
        )} 
        
      </div>
    </nav>
  );
}
