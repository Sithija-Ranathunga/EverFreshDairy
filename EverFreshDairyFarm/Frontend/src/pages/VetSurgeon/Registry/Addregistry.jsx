import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import VetSidebar from "../../../components/VetSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../../../assets/vet2.jpg";

const AddCowRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    CowID: "",
    BirthDate: "",
    Gender: "",
    location: "",
    age: "",
    Status: "Select" // Default to 'Select'
  });

  const [errors, setErrors] = useState({
    CowID: "",
    BirthDate: "",
    Gender: "",
    location: "",
    age: "",
    Status: ""
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      CowID: "",
      BirthDate: "",
      Gender: "",
      location: "",
      age: "",
      Status: ""
    };

    // Cow ID validation
    if (!formData.CowID.trim()) {
      newErrors.CowID = "Cow ID is required";
      isValid = false;
    } else if (!/^[A-Za-z0-9]{2,12}$/.test(formData.CowID)) {
      newErrors.CowID = "Cow ID must be 2-12 alphanumeric characters";
      isValid = false;
    }

    // Birth Date validation
    if (!formData.BirthDate) {
      newErrors.BirthDate = "Birth date is required";
      isValid = false;
    } else if (new Date(formData.BirthDate) > new Date()) {
      newErrors.BirthDate = "Birth date cannot be in the future";
      isValid = false;
    }

    // Gender validation
    if (!formData.Gender) {
      newErrors.Gender = "Gender is required";
      isValid = false;
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    } else if (!/^[A-Za-z0-9\s\-/]{3,50}$/.test(formData.location)) {
      newErrors.location = "Location must be 3-50 characters (letters, numbers, spaces, hyphens, or slashes)";
      isValid = false;
    }

    // Age validation
    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (isNaN(formData.age) || Number(formData.age) <= 0) {
      newErrors.age = "Age must be a positive number";
      isValid = false;
    } else if (Number(formData.age) > 30) {
      newErrors.age = "Age must be less than 30 years";
      isValid = false;
    }

    // Status validation
    if (formData.Status === "Select") {
      newErrors.Status = "Please select a status";
      isValid = false;
    } else if (!["Sick", "Pregnant", "Vaccinated"].includes(formData.Status)) {
      newErrors.Status = "Please select a valid status";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const submissionData = {
        ...formData,
        age: Number(formData.age)
      };

      await axios.post("http://localhost:8000/vetCowRegister", submissionData);
      alert("Cow registered successfully!");
      navigate("/Registry");
    } catch (err) {
      console.error("Registration failed", err);
      alert(`Registration failed: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-screen bg-cover"
        style = {{ backgroundImage: `url(${bgImage})`}}>
        <div className="ml-4 my-4 rounded-xl overflow-hidden h-[calc(100vh-8rem)]">
          <VetSidebar />
        </div>
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-sky-50 rounded-lg shadow-md p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Cow Registration</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Cow ID Field */}
                  <div>
                    <label className="block text-m font-medium text-gray-700 mb-1">
                      Cow ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="CowID"
                      value={formData.CowID}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.CowID ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. COW001"
                    />
                    {errors.CowID && (
                      <p className="mt-1 text-sm text-red-600">{errors.CowID}</p>
                    )}
                  </div>

                  {/* Birth Date Field */}
                  <div>
                    <label className="block text-m font-medium text-gray-700 mb-1">
                      Birth Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="BirthDate"
                      value={formData.BirthDate}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.BirthDate ? 'border-red-500' : 'border-gray-300'
                      }`}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    {errors.BirthDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.BirthDate}</p>
                    )}
                  </div>

                  {/* Gender Field */}
                  <div>
                    <label className="block text-m font-medium text-gray-700 mb-1">
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
                    {errors.Gender && (
                      <p className="mt-1 text-sm text-red-600">{errors.Gender}</p>
                    )}
                  </div>

                  {/* Age Field */}
                  <div>
                    <label className="block text-m font-medium text-gray-700 mb-1">
                      Age (years) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.age ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g. 3"
                      min="0"
                      max="30"
                    />
                    {errors.age && (
                      <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                    )}
                  </div>

                  {/* Location Field */}
                  <div className="md:col-span-2">
                    <label className="block text-m font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="e.g., Shed-1, Barn A, Field 2"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                  </div>

                  {/* Status Field */}
                  <div className="md:col-span-2">
                    <label className="block text-m font-medium text-gray-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="Status"
                      value={formData.Status}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.Status ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="Select">Select Status</option>
                      <option value="Sick">Sick</option>
                      <option value="Pregnant">Pregnant</option>
                      <option value="Vaccinated">Vaccinated</option>
                    </select>
                    {errors.Status && (
                      <p className="mt-1 text-sm text-red-600">{errors.Status}</p>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => navigate("/Registry")}
                    className="px-8 py-3 text-lg font-medium text-white bg-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 text-lg font-medium text-white bg-blue-800 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition-colors duration-200"
                  >
                    Register Now
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

export default AddCowRegistration;