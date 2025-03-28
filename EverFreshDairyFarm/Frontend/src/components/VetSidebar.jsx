import React from 'react'
import { assets } from '../assets/assets'

function CowRegistrationSidebar() {
  return (
    <div className="flex flex-col h-full p-5 bg-gray-500 text-black w-40">
      <nav className="flex flex-col items-center justify-center h-full">
        
        {/* Top Navigation Items */}
        <div className="flex flex-col items-center">
          {/* Increased space above Dashboard */}
          <img className='w-[20px] mt-10' src={assets.dashboard_icon} alt="Dashboard" /> {/* Changed from mt-10 to mt-16 */}
          <a href="/Registry" className="mt mb-6 font-bold hover:underline"> {/* Increased mt-2 to mt-4, mb-5 to mb-8 */}
            Dashboard
          </a>

          <img className='w-[20px] mt-6' src={assets.Registry_icon} alt="Registry" /> {/* Increased from mt-3 to mt-6 */}
          <a href="/Addregistry" className="mt mb-6 font-bold hover:underline"> {/* Increased mt-2 to mt-4, mb-5 to mb-8 */}
            Registry
          </a>

          <img className='w-[20px] mt-6' src={assets.Checkups_icon} alt="Checkups" /> {/* Increased from mt-3 to mt-6 */}
          <a href="/Checkups" className="mt mb-6 font-bold hover:underline"> {/* Increased mt-2 to mt-4, mb-5 to mb-8 */}
            Checkups
          </a>
       

          <img className='w-[15px] mt-3' src={assets.report_icon} alt="" />
          <a href="/Vetreport" className="mt mb-5 font-bold hover:underline">
            Report
          </a>
          </div>

        {/* Bottom Navigation Items */}
        <div className="mt-auto flex flex-col items-center">
          <img className='w-[20px] mt-6' src={assets.profile_icon} alt="Profile" /> {/* Increased from mt-3 to mt-6 */}
          <a href="/Vetprofile" className="mt mb-3 font-bold hover:underline"> {/* Increased mt-2 to mt-4, mb-5 to mb-8 */}
            Profile
          </a>

          <img className='w-[20px] mt-6' src={assets.logout_icon} alt="Logout" /> {/* Increased from mt-3 to mt-6 */}
          <a href="/" className="mt mb-3 font-bold hover:underline"> {/* Increased mt-2 to mt-4 */}
            Logout
          </a>
        </div>
      </nav>
    </div>
  )
}

export default CowRegistrationSidebar