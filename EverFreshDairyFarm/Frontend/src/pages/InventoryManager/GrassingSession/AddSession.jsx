import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import InventorySideBar from "../../../components/InventorySideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { assets } from "../../../assets/assets";

function AddSession() {
  const [SessionId, setSessionId] = useState("");
  const [Date, setDate] = useState("");
  const [ShedId, setShedId] = useState("");
  const [CowGroup, setCowGroup] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!SessionId.trim()) {
      newErrors.SessionId = "Session ID is required";
    }
    if (!ShedId.trim()) {
      newErrors.ShedId = "Shed ID is required";
    }
    if (!CowGroup.trim()) {
      newErrors.CowGroup = "Cow Group is required";
    }
    else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(Date)) {
        newErrors.Date = 'Date must be in YYYY/MM/DD format';
      }
      
      

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const requestData = {
      SessionId,
      ShedId,
      CowGroup,
      Date,
    };

    axios
      .post("http://localhost:8000/Grassing", requestData)
      .then((result) => {
        console.log("Session added:", result.data);
        alert("Session stored successfully");
        navigate('/session')
      })
      .catch((err) => {
        console.error("Session add failed", err);
        alert("Session add failed. Please try again...");
      });
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header />
      <div className="flex min-h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${assets.grass})`}}
      >
        <InventorySideBar />
        <div
          className="flex items-center justify-center flex-1 bg-center bg-cover"
          
        >
        <div className="flex flex-col items-center w-full">
          <h1 className="my-6 text-3xl font-bold text-center">Add Session</h1>

          <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4 w-96">
              <div>
                <label className="block font-semibold">Session Id:</label>
                <input
                  type="text"
                  value={SessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                  placeholder="Enter the Session ID"
                  className="w-full p-2 border rounded-md"
                />
                {errors.SessionId && (
                  <p className="text-red-500">{errors.SessionId}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Shed Id:</label>
                <input
                  type="text"
                  value={ShedId}
                  onChange={(e) => setShedId(e.target.value)}
                  placeholder="Enter the Shed ID"
                  className="w-full p-2 border rounded-md"
                />
                {errors.ShedId && (
                  <p className="text-red-500">{errors.ShedId}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Cow Group:</label>
                <input
                  type="text"
                  value={CowGroup}
                  onChange={(e) => setCowGroup(e.target.value)}
                  placeholder="Enter the Cow Group"
                  className="w-full p-2 border rounded-md"
                />
                {errors.CowGroup && (
                  <p className="text-red-500">{errors.CowGroup}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold">Date:</label>
                <input
                  type="text"
                  value={Date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="YYYY/MM/DD"
                  className="w-full p-2 border rounded-md"
                />
                {errors.Date && <p className="text-red-500">{errors.Date}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddSession;
