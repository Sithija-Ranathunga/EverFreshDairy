import React, { useContext } from 'react';
import { AppContent } from '../../../Content/AppContent';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

const Profile = () => {
  const { userData } = useContext(AppContent);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">       
        <p>Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container py-8 mx-auto">
        <h2 className="mb-4 text-2xl font-bold">User Profile</h2>
        <div className="p-6 bg-white rounded shadow-md">
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>NIC:</strong> {userData.NIC}
          </p>
          <p>
            <strong>Work Experience:</strong> {userData.workExperience}
          </p>
          {/* Add more fields as needed */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
