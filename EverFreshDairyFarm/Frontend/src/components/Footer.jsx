import React from "react";

export function Footer() {
  return (
    <footer className="bg-green-700 text-white p-4 shadow-lg z-40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-10 text-sm">
          {/* Company section */}
          <div className="hidden md:block">
            <h3 className="font-bold text-lg mb-2">Ever Fresh Dairy</h3>
            <p className="text-green-100 text-sm">Quality dairy products</p>
          </div>
          {/* Main links */}
          <div>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <a
                  href="#"
                  className="text-green-100 hover:text-white hover:underline transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-100 hover:text-white hover:underline transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-green-100 hover:text-white hover:underline transition-colors"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Social links */}
        <div className="hidden md:flex mt-4 md:mt-0 space-x-3">
          <a href="#" className="text-green-100 hover:text-white">
            <span className="sr-only">Facebook</span>
            {/* ...icon... */}
          </a>
          <a href="#" className="text-green-100 hover:text-white">
            <span className="sr-only">Instagram</span>
            {/* ...icon... */}
          </a>
        </div>
      </div>
      <p className="mt-4 text-sm text-center text-green-100">
        Ever Fresh Dairy &copy; {new Date().getFullYear()}. All Rights Reserved.
      </p>
    </footer>
  );
}
