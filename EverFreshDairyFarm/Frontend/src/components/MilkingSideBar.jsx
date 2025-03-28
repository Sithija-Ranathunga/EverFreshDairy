import React from 'react'
import { assets } from '../assets/assets'

function MilkingSideBar() {
    return (
        <div>
            {/* Sidebar */}
            <div className="flex flex-col h-full p-5 bg-gray-400 mtext-white w-30 rounded-lg mt-3 ml-6 shadow-lg">
               
                <nav className="flex flex-col items-center justify-center h-full">

                <div className="flex flex-col items-center">
               
                <img className='w-[20px] mt-10' src={assets.dashboard_icon} alt="" />
                   <a href="#" className="mt-2 mb-5 font-bold hover:underline">
                      Dashboard
                   </a>

                   <img className='w-[20px] mt-3' src={assets.session_icon} alt="" />
                    <a href="/milkingsession" className="mt-2 mb-5 font-bold hover:underline">
                        Session
                    </a>

                    <img className='w-[20px] mt-3' src={assets.milkingdata_icon} alt="" />
                    <a href="/milkingdata" className="mt-2 mb-5 font-bold hover:underline">
                        milkingData
                    </a>


                    <img className='w-[20px] mt-3' src={assets.report_icon} alt="" />
                    <a href="/milkingreport" className="mt-2 mb-5 font-bold hover:underline">
                        Report
                    </a>

                    <img className='w-[20px] mt-3' src={assets.profile_icon} alt="" />
                    <a href="#" className="mt-2 mb-5 font-bold hover:underlline">
                        Profile
                    </a>

                    <img className='w-[20px] mt-3' src={assets.logout_icon} alt="" />
                    <a href="/loginMilking" className="mt-2 mb-5 font-bold hover:underline">
                        Logout
                    </a>
                    </div>
                </nav>
            </div>
        </div >
    )
}

export default MilkingSideBar