import React from "react";
import { assets } from "../assets/assets";

function InventorySideBar() {
  return (
    <div className="p-4">
      <div className="flex flex-col h-full p-5 bg-gray-400 text-black shadow-lg w-36 rounded-3xl">
        <nav className="flex flex-col items-center justify-center">
          <img className="w-[20px] mt-10" src={assets.dashboard_icon} alt="" />
          <a
            href="/grassing"
            className="mt-2 mb-5 font-semibold hover:underline"
          >
            Dashboard
          </a>

          <img className="w-[20px] mt-3" src={assets.session_icon} alt="" />
          <a
            href="/session"
            className="mt-2 mb-5 font-semibold hover:underline"
          >
            Session
          </a>

          <img className="w-[20px] mt-3" src={assets.report_icon} alt="" />
          <a href="/report" className="mt-2 mb-5 font-semibold hover:underline">
            Report
          </a>

          <img className="w-[20px] mt-5" src={assets.profile_icon} alt="" />
          <a
            href="/inventory"
            className="mt-2 mb-5 font-semibold hover:underline"
          >
            Profile
          </a>
        </nav>
      </div>
    </div>
  );
}

export default InventorySideBar;
