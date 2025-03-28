import React, { useEffect, useState } from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import InventorySideBar from '../../../components/InventorySideBar'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";


function UpdateCheckups() {
  const { id } = useParams();
  const [cowID, setCowID] = useState("");
  const [location, setLocation] = useState("");
  const [checkupReason, setCheckupReason] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [date, setDate] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!cowID.trim()) {
      newErrors.cowID = "Cow ID is required";
    }
    if (!location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!checkupReason.trim()) {
      newErrors.checkupReason = "Checkup reason is required";
    }
    if (!diagnosis.trim()) {
      newErrors.diagnosis = "Diagnosis is required";
    }
    if (!specialNote.trim()) {
      newErrors.specialNote = "Special note is required";
    }
    if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)) {
      newErrors.date = 'Date must be in YYYY/MM/DD format';
    }
      
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
     
  useEffect(() => {
    axios
      .get(`http://localhost:8000/vetCheckups/${id}`)
      .then((response) => {
        console.log("Fetched Data:", response.data.checkups);

        const checkupData = response.data.checkups || response.data;

        setCowID(checkupData.cowID);
        setLocation(checkupData.location);
        setCheckupReason(checkupData.CheckupReason);
        setDiagnosis(checkupData.Diagnosis);
        setSpecialNote(checkupData.SpecialNote);
        
        // Format date to YYYY/MM/DD
        const formattedDate = new Date(checkupData.Date)
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "/"); // Converts YYYY-MM-DD to YYYY/MM/DD
  
        setDate(formattedDate);
      })
      .catch((err) => console.error("Error fetching checkup data: ", err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .put(`http://localhost:8000/vetCheckups/${id}`, {
        cowID,
        location, 
        CheckupReason: checkupReason,
        Diagnosis: diagnosis,
        Date: date,
        SpecialNote: specialNote,
      })
      .then((result) => {
        console.log("Checkup Update Successfully.:", result.data);
        alert("Checkup update successful!");
        navigate("/checkups");
      })
      .catch((err) => {
        console.error("Error updating checkup:", err);
        alert("Update failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header />
      <div className="flex">
       <InventorySideBar />
        <div className="flex items-center justify-center flex-1 bg-center bg-cover">
          <div className="flex flex-col items-center w-full">
            <h1 className="my-6 text-3xl font-bold text-center">Update Checkup Details</h1>

            <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
              <form onSubmit={handleUpdate} className="space-y-4 w-96">
                <div>
                  <label className="block font-semibold">Cow ID:</label>
                  <input
                    type="text"
                    value={cowID}
                    onChange={(e) => setCowID(e.target.value)}
                    placeholder="Enter Cow ID"
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.cowID && (
                    <p className="text-red-500">{errors.cowID}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold">Location:</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter Location"
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.location && (
                    <p className="text-red-500">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold">Checkup Reason:</label>
                  <input
                    type="text"
                    value={checkupReason}
                    onChange={(e) => setCheckupReason(e.target.value)}
                    placeholder="Enter Checkup Reason"
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.checkupReason && (
                    <p className="text-red-500">{errors.checkupReason}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold">Diagnosis:</label>
                  <input
                    type="text"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    placeholder="Enter Diagnosis"
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.diagnosis && (
                    <p className="text-red-500">{errors.diagnosis}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold">Date:</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="YYYY/MM/DD"
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.date && <p className="text-red-500">{errors.date}</p>}
                </div>

                <div>
                  <label className="block font-semibold">Special Note:</label>
                  <textarea
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="Enter Special Notes"
                    className="w-full p-2 border rounded-md"
                    rows="3"
                  />
                  {errors.specialNote && (
                    <p className="text-red-500">{errors.specialNote}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Update Checkup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UpdateCheckups