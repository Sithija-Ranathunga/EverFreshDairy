import React, { useEffect, useState } from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import InventorySideBar from '../../../components/InventorySideBar'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import { assets } from '../../../assets/assets'

function GrassingSessionUpdate() {
  const { id } = useParams();
  const [SessionId, setSessionId] = useState("");
  const [sessionDate, setDate] = useState("");
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
    else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(sessionDate)) {
        newErrors.sessionDate = 'Date must be in YYYY/MM/DD format';
      }
      
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
     
  useEffect(()=>{
    axios
      .get(`http://localhost:8000/Grassing/${id}`)
      .then((response) => {
        console.log("Fetched Data:",response.data.session);

        const sessionData = response.data.session;
        //console.log(sessionData.CowGroup);

        setCowGroup(sessionData.CowGroup);
        setSessionId(sessionData.SessionId);
        setShedId(sessionData.ShedId);
        const formattedDate = new Date(sessionData.Date)
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "/"); // Converts YYYY-MM-DD to YYYY/MM/DD
  
        setDate(formattedDate);
      })
      .catch((err) => console.error("Error fetching session data: ",err));
  },[id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .put(`http://localhost:8000/Grassing/${id}`, {
        SessionId,
        sessionDate, 
        ShedId,
        CowGroup,
      })
      .then((result) => {
        console.log("Session Update Successful:", result.data);
        alert("Session update successful!");
        navigate("/session");
      })
      .catch((err) => {
        console.error("Error updating session:", err);
        alert("Update failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header />
      <div className="flex">
        <InventorySideBar />
        <div
          className="flex items-center justify-center flex-1 bg-center bg-cover"
         
        >
        <div className="flex flex-col items-center w-full">
          <h1 className="my-6 text-3xl font-bold text-center">Update Session</h1>

          <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
            <form onSubmit={handleUpdate} className="space-y-4 w-96">
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
                  value={sessionDate}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="YYYY/MM/DD"
                  className="w-full p-2 border rounded-md"
                />
                {errors.sessionDate && <p className="text-red-500">{errors.sessionDate}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Update
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

export default GrassingSessionUpdate