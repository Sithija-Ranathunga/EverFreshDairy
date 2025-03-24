import React from 'react'
import { assets } from '../assets/assets'

function InventorySideBar() {
  return (
    <div>
         {/* Sidebar */}
      <div className="flex flex-col h-full p-5 bg-green-600 mtext-white w-60">
       
        <nav className="flex flex-col items-center justify-center">
            
        <img className='w-[20px] mt-10' src={assets.dashboard_icon} alt="" />
          <a href="#" className="mt-2 mb-5 font-bold hover:underline">
            Dashboard
          </a>

          <img className='w-[20px] mt-3' src={assets.session_icon} alt="" />
          <a href="#" className="mt-2 mb-5 font-bold hover:underline">
            Session
          </a>

          <img className='w-[20px] mt-3' src={assets.report_icon} alt="" />
          <a href="#" className="mt-2 mb-5 font-bold hover:underline">
            Report
          </a>
          
          <img className='w-[20px] mt-20' src={assets.profile_icon} alt="" />
          <a href="#" className="mt-2 mb-5 font-bold hover:underline">
            Profile
          </a>

          <img className='w-[20px] mt-3' src={assets.logout_icon} alt="" />
          <a href="#" className="mt-2 mb-5 font-bold hover:underline">
            Logout
          </a>
        </nav>
      </div>
    </div>
  )
}

export default InventorySideBar