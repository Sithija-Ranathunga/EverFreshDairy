import React from 'react'

export function adminFooter() {
    return (
        <footer className="bg-green-800 text-white p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Ever Fresh Dairy © 2025</h3>
              <p className="text-sm">All Rights Reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-green-200">Privacy Policy</a>
              <a href="#" className="hover:text-green-200">About Us</a>
              <a href="#" className="hover:text-green-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }