import React, { useContext } from 'react';
import { AppContent } from '../../../Content/AppContent';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import InventorySideBar from '../../../components/InventorySideBar';

const Profile = () => {
  const { userData } = useContext(AppContent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 text-gray-800">
      <Header />
      <div className="flex min-h-screen">
        <InventorySideBar />

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-green-800">
          User Profile
        </h2>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-green-200">
          <div className="space-y-6 text-base leading-relaxed">
            {/* Each row */}
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-semibold text-green-700 w-1/3">Name:</span>
              <span className="text-right w-2/3">{userData?.name || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-semibold text-green-700 w-1/3">Email:</span>
              <span className="text-right w-2/3">{userData?.email || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-semibold text-green-700 w-1/3">NIC:</span>
              <span className="text-right w-2/3">{userData?.NIC || "N/A"}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-green-700 w-1/3">Work Experience:</span>
              <span className="text-right w-2/3">{userData?.workExperience || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
</div>
      <Footer />
    </div>
  );
};

export default Profile;
