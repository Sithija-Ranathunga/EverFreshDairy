import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import VetSidebar from "../../../components/VetSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCheckups() {
  const [formData, setFormData] = useState({
    cowID: "",
    location: "",
    CheckupReason: "",
    Diagnosis: "",
    Date: "",
    SpecialNote: ""
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cowID.trim()) {
      newErrors.cowID = "Cow ID is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.CheckupReason.trim()) {
      newErrors.CheckupReason = "Checkup reason is required";
    }

    if (!formData.Diagnosis.trim()) {
      newErrors.Diagnosis = "Diagnosis is required";
    }

    if (!formData.Date) {
      newErrors.Date = "Date is required";
    }

    if (!formData.SpecialNote.trim()) {
      newErrors.SpecialNote = "Special note is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .post("http://localhost:8000/vetCheckups", formData)
      .then(() => {
        alert("Checkup record added successfully!");
        navigate('/checkups');
      })
      .catch((err) => {
        console.error("Checkup add failed", err);
        alert(`Checkup add failed: ${err.response?.data?.message || "Please try again"}`);
      });
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header />
      <div className="flex">
        <div className="ml-4 my-4 rounded-xl overflow-hidden">
          <VetSidebar />
        </div>
        
        <div className="flex flex-col items-center w-full pl-4">
          <h1 className="my-6 text-3xl font-bold text-center">Add Checkup Record</h1>

          <div className="w-full max-w-2xl p-8 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Cow ID Field */}
                <div>
                  <label className="block font-semibold">Cow ID:</label>
                  <input
                    type="text"
                    name="cowID"
                    value={formData.cowID}
                    onChange={handleChange}
                    className={`w-full p-2 mt-1 border rounded-md ${errors.cowID ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter Cow ID"
                  />
                  {errors.cowID && <p className="mt-1 text-sm text-red-500">{errors.cowID}</p>}
                </div>

                {/* Location Field */}
                <div>
                  <label className="block font-semibold">Location:</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full p-2 mt-1 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter location"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                </div>

                {/* Checkup Reason Field */}
                <div className="md:col-span-2">
                  <label className="block font-semibold">Checkup Reason:</label>
                  <input
                    type="text"
                    name="CheckupReason"
                    value={formData.CheckupReason}
                    onChange={handleChange}
                    className={`w-full p-2 mt-1 border rounded-md ${errors.CheckupReason ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter checkup reason"
                  />
                  {errors.CheckupReason && <p className="mt-1 text-sm text-red-500">{errors.CheckupReason}</p>}
                </div>

                {/* Diagnosis Field */}
                <div className="md:col-span-2">
                  <label className="block font-semibold">Diagnosis:</label>
                  <input
                    type="text"
                    name="Diagnosis"
                    value={formData.Diagnosis}
                    onChange={handleChange}
                    className={`w-full p-2 mt-1 border rounded-md ${errors.Diagnosis ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter diagnosis"
                  />
                  {errors.Diagnosis && <p className="mt-1 text-sm text-red-500">{errors.Diagnosis}</p>}
                </div>

                {/* Date Field */}
                <div>
                  <label className="block font-semibold">Date:</label>
                  <input
                    type="date"
                    name="Date"
                    value={formData.Date}
                    onChange={handleChange}
                    className={`w-full p-2 mt-1 border rounded-md ${errors.Date ? 'border-red-500' : 'border-gray-300'}`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.Date && <p className="mt-1 text-sm text-red-500">{errors.Date}</p>}
                </div>

                {/* Special Note Field */}
                <div className="md:col-span-2">
                  <label className="block font-semibold">Special Note:</label>
                  <textarea
                    name="SpecialNote"
                    value={formData.SpecialNote}
                    onChange={handleChange}
                    className={`w-full p-2 mt-1 border rounded-md ${errors.SpecialNote ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Enter special notes"
                    rows="3"
                  />
                  {errors.SpecialNote && <p className="mt-1 text-sm text-red-500">{errors.SpecialNote}</p>}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/checkups')}
                  className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Checkup
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddCheckups;