import React, { useEffect, useState } from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import VetSidebar from '../../../components/VetSidebar'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";

function UpdateCheckups() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    cowID: "",
    location: "",
    checkupReason: "",
    diagnosis: "",
    date: "",
    specialNote: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/vetCheckups/${id}`)
      .then((response) => {
        const checkupData = response.data.checkups || response.data;
        setFormData({
          cowID: checkupData.cowID || "",
          location: checkupData.location || "",
          checkupReason: checkupData.CheckupReason || "",
          diagnosis: checkupData.Diagnosis || "",
          date: checkupData.Date ? new Date(checkupData.Date).toISOString().split("T")[0] : "",
          specialNote: checkupData.SpecialNote || ""
        });
      })
      .catch((err) => console.error("Error fetching checkup data: ", err));
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['cowID', 'location', 'checkupReason', 'diagnosis', 'date', 'specialNote'];

    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    // Specific validations
    if (formData.cowID && !/^[A-Za-z0-9]+$/.test(formData.cowID)) {
      newErrors.cowID = "Cow ID should be alphanumeric";
    }

    if (formData.date && !/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
      newErrors.date = "Date must be in YYYY-MM-DD format";
    } else if (formData.date && new Date(formData.date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
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

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .put(`http://localhost:8000/vetCheckups/${id}`, {
        cowID: formData.cowID,
        location: formData.location, 
        CheckupReason: formData.checkupReason,
        Diagnosis: formData.diagnosis,
        Date: formData.date,
        SpecialNote: formData.specialNote,
      })
      .then(() => {
        alert("Checkup record updated successfully!");
        navigate("/checkups");
      })
      .catch((err) => {
        console.error("Error updating checkup:", err);
        alert(`Update failed: ${err.response?.data?.message || "Please try again"}`);
      });
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header />
      <div className="flex">
        <VetSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Update Checkup Details</h1>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-m font-medium text-gray-600 mb-1">Cow ID *</label>
                    <input
                      type="text"
                      name="cowID"
                      value={formData.cowID}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.cowID ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter Cow ID"
                    />
                    {errors.cowID && <p className="mt-1 text-sm text-red-500">{errors.cowID}</p>}
                  </div>

                  <div>
                    <label className="block text-m font-medium text-gray-600 mb-1">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter Location"
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-m font-medium text-gray-600 mb-1">Checkup Reason *</label>
                    <input
                      type="text"
                      name="checkupReason"
                      value={formData.checkupReason}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.checkupReason ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter Checkup Reason"
                    />
                    {errors.checkupReason && <p className="mt-1 text-sm text-red-500">{errors.checkupReason}</p>}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-m font-medium text-gray-600 mb-1">Diagnosis *</label>
                    <input
                      type="text"
                      name="diagnosis"
                      value={formData.diagnosis}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.diagnosis ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter Diagnosis"
                    />
                    {errors.diagnosis && <p className="mt-1 text-sm text-red-500">{errors.diagnosis}</p>}
                  </div>

                  <div>
                    <label className="block text-m font-medium text-gray-600 mb-1">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className={`w-full p-2 border rounded-md ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-m font-medium text-gray-600 mb-1">Special Note *</label>
                    <textarea
                      name="specialNote"
                      value={formData.specialNote}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.specialNote ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter Special Notes"
                      rows="3"
                    />
                    {errors.specialNote && <p className="mt-1 text-sm text-red-500">{errors.specialNote}</p>}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Checkup
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

export default UpdateCheckups;