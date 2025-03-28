<<<<<<< Updated upstream
import React, { useContext } from 'react';
import { AppContent } from '../../../Content/AppContent';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import InventorySideBar from '../../../components/InventorySideBar';
import { Pencil } from 'lucide-react';

const Profile = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Header />
      <div className="flex min-h-screen">
        <InventorySideBar />
=======
import React, { useEffect, useState } from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import InventorySideBar from '../../../components/InventorySideBar'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();
  const [user,setUser] = useState("")

  useEffect(()=>{
    
  },[])
  return (
    <div>
      <Header/>
          <div>
            <InventorySideBar/>
          </div>
      <Footer/>
    </div>
  )
}
>>>>>>> Stashed changes

        <div className="flex flex-col items-center justify-center w-full px-4 py-12">
          <div className="bg-white border-2 border-blue-700 rounded-lg p-10 max-w-2xl w-full shadow-md">
            {/* Profile Picture and Name Section */}
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <h2 className="text-xl font-semibold mt-4">
                {userData?.name || 'Your Name'}
              </h2>
              <div className="text-gray-500 flex items-center gap-1">
                @{userData?.username || 'yourusername'}
                <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" />
              </div>
            </div>

            {/* Your Custom Fields */}
            <div className="space-y-6">
              <ProfileField label="Name" value={userData?.name || "N/A"} />
              <ProfileField label="Email" value={userData?.email || "N/A"} />
              <ProfileField label="NIC" value={userData?.NIC || "N/A"} />
              <ProfileField label="Work Experience" value={userData?.workExperience || "N/A"} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Reusable Field Component
const ProfileField = ({ label, value }) => (
  <div className="flex justify-between items-center border-b pb-3">
    <span className="font-semibold text-gray-700">{label}</span>
    <span className="flex items-center gap-2 text-gray-600">
      {value}
      <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" />
    </span>
  </div>
);

export default Profile;
