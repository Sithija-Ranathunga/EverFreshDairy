import React from 'react'
import { assets } from '../assets/assets'

function MilkingSideBar() {
    return (
        <div>
            {/* Sidebar */}
            <div className="flex flex-col h-full p-8 bg-green-900 mtext-white w-40">
               
                <nav className="flex flex-col items-center justify-center">
               
                <img className='w-[20px] mt-10' src={assets.dashboard_icon} alt="" />
                   <a href="#" className="mt-2 mb-5 font-bold hover:underline">
                      Dashboard
                   </a>

                   <img className='w-[20px] mt-3' src={assets.session_icon} alt="" />
                    <a href="#" className="mt-2 mb-5 font-bold hover:underline">
                        Session
                    </a>

                    <img className='w-[20px] mt-3' src={assets.milkingdata_icon} alt="" />
                    <a href="#" className="mt-2 mb-5 font-bold hover:underline">
                        milkingData
                    </a>

                    <img className='w-[20px] mt-3' src={assets.report_icon} alt="" />
                    <a href="#" className="mt-2 mb-5 font-bold hover:underline">
                        Report
                    </a>

                    <img className='w-[20px] mt-3' src={assets.profile_icon} alt="" />
                    <a href="#" className="mt-2 mb-5 font-bold hover:underlline">
                        Profile
                    </a>

                    <img className='w-[20px] mt-3' src={assets.logout_icon} alt="" />
                    <a href="#" className="mt-2 mb-5 font-bold hover:underline">
                        Logout
                    </a>
                </nav>
            </div>
        </div >
    )
}

export default MilkingSideBar