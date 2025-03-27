import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import VetSidebar from "../../../components/VetSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CowRegistration() {
  const navigate = useNavigate();
  const [cows, setCows] = useState([]);
  const [stats, setStats] = useState({
    totalCows: 0,
    vaccinatedPercentage: 0,
    pregnantCows: 0
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/vetCowRegister")
      .then((response) => {
        if (response.data && response.data.Cowregistry) {
          setCows(response.data.Cowregistry);
          
          const total = response.data.Cowregistry.length;
          const vaccinated = response.data.Cowregistry.filter(
            cow => cow.Status === 'Vaccinated' || cow.Status === 'Sick'
          ).length;
          const pregnant = response.data.Cowregistry.filter(
            cow => cow.Status === 'Pregnant' || cow.Status === 'Close to Calve'
          ).length;
          
          setStats({
            totalCows: total,
            vaccinatedPercentage: total > 0 ? Math.round((vaccinated / total) * 100) : 0,
            pregnantCows: pregnant
          });
        } else {
          console.error("Unexpected response format:", response.data);
          setCows([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/vetCowRegister/${id}`)
      .then((res) => {
        setCows((prevCows) => prevCows.filter((cow) => cow._id !== id));
        setStats(prev => ({
          ...prev,
          totalCows: prev.totalCows - 1
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar with rounded corners and spacing */}
        <div className="ml-4 my-4 rounded-xl overflow-hidden h-[calc(100vh-8rem)]">
          <VetSidebar />
        </div>

        <div className="flex-1 pl-8 pr-4 bg-gray-100">
          <h1 className="mt-10 mb-2 text-3xl font-bold">Welcome Nirasha,</h1>

          

          {/* Stats Cards with green background */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 mt-6">
            <div className="flex flex-col items-center py-4 bg-green-100 rounded-lg px-6 shadow-md w-full max-w-xs border border-green-200">
              <h2 className="text-2xl font-bold text-green-800">{stats.totalCows}</h2>
              <p className="text-green-700">Total No. of Cows</p>
            </div>

            <div className="flex flex-col items-center py-4 bg-green-100 rounded-lg px-6 shadow-md w-full max-w-xs border border-green-200">
              <div className="w-full bg-green-800 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-green-700 h-2.5 rounded-full" 
                  style={{ width: `${stats.vaccinatedPercentage}%` }}
                ></div>
              </div>
              <p className="text-s text-green-700">{stats.vaccinatedPercentage}% Vaccinated</p>
            </div>

            <div className="flex flex-col items-center py-4 bg-green-100 rounded-lg px-6 shadow-md w-full max-w-xs border border-green-200">
              <h2 className="text-2xl font-bold text-green-800">{stats.pregnantCows}</h2>
              <p className="text-green-700">Total Pregnant Cows</p>
            </div>
          </div>

          {/* Registration Details section with centered heading and right-aligned button */}
          <div className="relative mb-8">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Registration Details</h2>
            <div className="absolute right-0 top-0">
              <button
                className="px-6 py-2 text-white bg-green-800 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                onClick={() => navigate("/Addregistry")}
              >
                +  Add Details
              </button>
            </div>
          </div>

          {/* Registry Table */}
          <div className="w-full mx-auto mt-4 mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 gap-4 p-4 bg-green-700 text-white font-semibold">
              <div className="text-center">Cow ID</div>
              <div className="text-center">Location</div>
              <div className="text-center">Status</div>
              <div className="text-center">Age</div>
              <div className="text-center">Actions</div>
            </div>
            
            {Array.isArray(cows) && cows.length > 0 ? (
              cows.map((cow) => (
                <div 
                  key={cow._id}
                  className="grid grid-cols-5 gap-4 p-4 border-b hover:bg-gray-50 even:bg-gray-50"
                >
                  <div className="text-center">{cow.CowID}</div>
                  <div className="text-center">{cow.location}</div>
                  <div className="text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      cow.Status === 'Sick' ? 'bg-red-100 text-red-800' :
                      cow.Status === 'Pregnant' ? 'bg-purple-100 text-purple-800' :
                      cow.Status === 'Vaccinated' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {cow.Status}
                    </span>
                  </div>
                  <div className="text-center">{cow.age}</div>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => navigate(`/UpdateRegistry/${cow._id}`)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(cow._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No cows registered yet
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CowRegistration;