import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiDroplet, FiAlertTriangle } from 'react-icons/fi';
import logo from '../../assets/logo.png';  // Make sure your logo is saved here

const Sidebar = () => {
  return (
    <div className="h-screen bg-green-800 text-white flex flex-col w-64 fixed left-0 top-0 shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-green-700">
        <img src={logo} alt="EverFresh Dairy Logo" className="h-14 w-auto rounded-full shadow" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-4">
        <Link
          to="/admin"
          className="flex items-center space-x-3 hover:bg-green-700 p-3 rounded transition"
        >
          <FiHome />
          <span className="font-medium">Dashboard</span>
        </Link>

        <Link
          to="/admin/milking"
          className="flex items-center space-x-3 hover:bg-green-700 p-3 rounded transition"
        >
          <FiDroplet />
          <span className="font-medium">Milking Management</span>
        </Link>

        <Link
          to="/admin/alerts"
          className="flex items-center space-x-3 hover:bg-green-700 p-3 rounded transition"
        >
          <FiAlertTriangle />
          <span className="font-medium">Health Alerts</span>
        </Link>
      </nav>

      {/* Footer */}
      <div className="text-xs text-center p-4 border-t border-green-700">
        © 2025 EverFresh Dairy
      </div>
    </div>
  );
};

export default Sidebar;
