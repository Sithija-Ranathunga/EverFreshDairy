import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import VetSidebar from "../../../components/VetSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../../../assets/assets";

function CheckupsPage() {
  const navigate = useNavigate();
  const [checkups, setCheckups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCheckups();
  }, []);

  const fetchCheckups = async () => {
    try {
      const response = await axios.get("http://localhost:8000/vetCheckups");
      if (Array.isArray(response.data.checkups)) {
        setCheckups(response.data.checkups);
      } else {
        console.error("Expected an array but got:", response.data);
        setCheckups([]);
      }
    } catch (err) {
      console.error("Error fetching checkups:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/checkups/${id}`);
      setCheckups(prev => prev.filter(checkup => checkup._id !== id));
    } catch (err) {
      console.error("Error deleting checkup:", err);
    }
  };

  const filteredCheckups = checkups.filter((checkup) => {
    const query = searchQuery.toLowerCase();
    return (
      (checkup.cowID && checkup.cowID.toLowerCase().includes(query)) ||
      (checkup.location && checkup.location.toLowerCase().includes(query)) ||
      (checkup.CheckupReason && checkup.CheckupReason.toLowerCase().includes(query)) ||
      (checkup.Diagnosis && checkup.Diagnosis.toLowerCase().includes(query))
    );
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      

     <div className="flex flex-1">
        <div className="ml-4 my-4 rounded-xl overflow-hidden h-[calc(100vh-8rem)]">
          <VetSidebar />
        </div>
        
        <div className="flex-1 pl-8 pr-4">
          <h1 className="mt-10 mb-6 text-3xl font-bold">Checkup Records</h1>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">Checkup Details</h3>
            <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=" 🔍   Search ..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => navigate("/AddCheckups")}
              >
                Add Checkup
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Cow ID</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Checkup Reason</th>
                  <th className="p-3 text-left">Diagnosis</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCheckups.length > 0 ? (
                  filteredCheckups.map((checkup) => (
                    <tr key={checkup._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{checkup.cowID}</td>
                      <td className="p-3">{checkup.location}</td>
                      <td className="p-3">{checkup.CheckupReason}</td>
                      <td className="p-3">{checkup.Diagnosis}</td>
                      <td className="p-3">{formatDate(checkup.Date)}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => navigate(`/updatechekups/${checkup._id}`)}
                          className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(checkup._id)}
                          className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No checkup records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default CheckupsPage;