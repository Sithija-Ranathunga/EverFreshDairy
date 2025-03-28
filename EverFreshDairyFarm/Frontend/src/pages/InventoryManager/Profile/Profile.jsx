
import React, { useContext } from 'react';
import { AppContent } from '../../../Content/AppContent';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import InventorySideBar from '../../../components/InventorySideBar';
import { Pencil } from 'lucide-react';

const Profile = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="min-h-screen text-gray-800 bg-white">
      <Header />
      <div className="flex min-h-screen">
        <InventorySideBar />


        <div className="flex flex-col items-center justify-center w-full px-4 py-12">
          <div className="w-full max-w-2xl p-10 bg-white border-2 border-blue-700 rounded-lg shadow-md">
            {/* Profile Picture and Name Section */}
            <div className="flex flex-col items-center mb-6">
              <img
                src="https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg?semt=ais_hybrid"
                alt="Profile"
                className="object-cover w-24 h-24 rounded-full"
              />
              <h2 className="mt-4 text-xl font-semibold">
                {userData?.name || 'Your Name'}
              </h2>
              <div className="flex items-center gap-1 text-gray-500">
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
  <div className="flex items-center justify-between pb-3 border-b">
    <span className="font-semibold text-gray-700">{label}</span>
    <span className="flex items-center gap-2 text-gray-600">
      {value}
      <Pencil className="w-4 h-4 text-blue-500 cursor-pointer" />
    </span>
  </div>
);

export default Profile;
