import React from 'react'

export function Footer() {
    return (
      <footer className="p-6 bg-gray-200 text-green ">
        <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
          <div className="flex space-x-10 text-sm">
            <div>
              <ul>
                <li><a href="#" className="hover:underline">####</a></li>
                <li><a href="#" className="hover:underline">####</a></li>
                <li><a href="#" className="hover:underline">####</a></li>
                <li><a href="#" className="hover:underline">####</a></li>
              </ul>
            </div>
            <div>
              <ul>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">About Us</a></li>
              </ul>
            </div>
          </div>
          <div className="flex mt-4 space-x-4 md:mt-0">
            <a href="#" className="text-xl text-white"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-xl text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-xl text-white"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
        <p className="mt-4 text-sm text-center text-gray-400">Ever Fresh Dairy &copy; 2025. All Rights Reserved.</p>
      </footer>
    );
  }