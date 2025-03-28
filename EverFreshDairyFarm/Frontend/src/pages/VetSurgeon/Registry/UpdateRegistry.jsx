import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import VetSidebar from "../../../components/VetSidebar";

const UpdateCowRegistry = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CowID: "",
    BirthDate: "",
    Gender: "",
    location: "",
    age: "",
    Status: ""
  });

  useEffect(() => {
    const fetchCowDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/vetCowRegister/${id}`);
        console.log(response);
        const cowData = response.data.Cowregister;
        
        // Format date for input field
        const formattedDate = new Date(cowData.BirthDate).toISOString().split('T')[0];
        
        setFormData({
          CowID: cowData.CowID,
          BirthDate: formattedDate,
          Gender: cowData.Gender,
          location: cowData.location,
          age: cowData.age,
          Status: cowData.Status
        });
      } catch (error) {
        console.error("Error fetching cow details:", error);
        alert(`Error fetching cow details: ${error.response?.data?.message || error.message}`);
      }
    };

    fetchCowDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`http://localhost:8000/vetCowRegister/${id}`, formData);
      alert("Cow registry updated successfully!");
      navigate("/Registry");
    } catch (error) {
      console.error("Error updating cow registry:", error);
      alert(`Update failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <div className="ml-4 my-4 rounded-xl overflow-hidden h-[calc(100vh-8rem)]">
          <VetSidebar />
        </div>
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Update Cow Registry</h1>

            <div className="bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Cow ID Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cow ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="CowID"
                      value={formData.CowID}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  {/* Birth Date Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Birth Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="BirthDate"
                      value={formData.BirthDate}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      max={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex space-x-4 mt-1">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="Gender"
                          value="Female"
                          checked={formData.Gender === "Female"}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          required
                        />
                        <span className="ml-2 text-gray-700">Female</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="Gender"
                          value="Male"
                          checked={formData.Gender === "Male"}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Male</span>
                      </label>
                    </div>
                  </div>

                  {/* Age Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Age (years) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. 3"
                      min="0"
                      max="30"
                      required
                    />
                  </div>

                  {/* Location Field */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Shed-1, Barn A, Field 2"
                      required
                    />
                  </div>

                  {/* Status Field */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="Status"
                      value={formData.Status}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Active">Select</option>
                      <option value="Sick">Sick</option>
                      <option value="Pregnant">Pregnant</option>
                      <option value="Close to Calve">Close to Calve</option>
                      <option value="Vaccinated">Vaccinated</option>
                    </select>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate("/vetCowRegister")}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update Registry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateCowRegistry;