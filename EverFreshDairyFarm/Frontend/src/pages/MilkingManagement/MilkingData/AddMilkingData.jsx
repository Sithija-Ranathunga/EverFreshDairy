import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MilkingSideBar from "../../../components/MilkingSideBar";
import { assets } from "../../../assets/assets";
import bgImage from "../../../assets/bg.jpg";

function AddMilkingData() {
  const [cowId, setCowId] = useState("");
  const [amountofMilk, setAmountOfMilk] = useState("");
  const [temperature, setTemperature] = useState("");
  const [duration, setDuration] = useState("");
  const [qualityCheckResult, setQualityCheckResult] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};

    if (!cowId.trim()) newErrors.cowId = "Valid Cow ID is required";
    if (!amountofMilk.trim())
      newErrors.amountofMilk = "Valid milk amount is required";
    if (!temperature.trim()) newErrors.temperature = "Temperature is required";
    if (!duration.trim() || isNaN(Number(duration)) || Number(duration) <= 0)
      newErrors.duration = "Valid duration is required";
    if (!qualityCheckResult.trim())
      newErrors.qualityCheckResult = "Quality check result is required";
    else if (!["pass", "Fail"].includes(qualityCheckResult))
      newErrors.qualityCheckResult = "Must be 'pass' or 'Fail'";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const requestData = {
      cowId: cowId.trim(),
      amountofMilk: Number(amountofMilk), // Convert to number
      temperature: Number(temperature), // Convert to number
      duration: Number(duration),
      qualityCheckResult,
    };

    // Get the authentication token
    const token = localStorage.getItem("milkingtoken");

    // Configure headers with authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Log request data to the console for debugging
    console.log("Request Data:", requestData);

    axios
      .post("http://localhost:8000/milkingData", requestData, config)
      .then((response) => {
        console.log("Success response:", response.data);
        alert("Milking data added successfully");
        navigate("/milkingdata");
      })
      .catch((err) => {
        // Log error response to get more details
        console.error("Error adding milking data:", err.response?.data || err.message);
        if (err.response && err.response.data) {
          alert("Failed to add milking data: " + (err.response.data.message || JSON.stringify(err.response.data)));
        } else {
          alert("Failed to add milking data. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen font-sans bg-sky-100">
      <Header />

      <div
        className="flex items-center justify-center min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <MilkingSideBar />
        <div className="flex flex-col items-center w-full ml-[-200px]">
          <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="space-y-3 w-80">
              <h1 className="my-5 mb-10 text-3xl font-bold  text-center">
                Add Milking Data
              </h1>
              <div>
                <label className="block font-semibold">Cow ID:</label>
                <input
                  type="text"
                  value={cowId}
                  onChange={(e) => setCowId(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                {errors.cowId && <p className="text-red-500">{errors.cowId}</p>}
              </div>
              <div>
                <label className="block font-semibold">Milk Amount:</label>
                <input
                  type="text"
                  value={amountofMilk}
                  onChange={(e) => setAmountOfMilk(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                {errors.amountofMilk && (
                  <p className="text-red-500">{errors.amountofMilk}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold">Temperature (°C):</label>
                <input
                  type="text"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                {errors.temperature && (
                  <p className="text-red-500">{errors.temperature}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold">Duration:</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                {errors.duration && (
                  <p className="text-red-500">{errors.duration}</p>
                )}
              </div>
              <div>
                <label className="block font-semibold">
                  Quality Check Result:
                </label>
                <select
                  value={qualityCheckResult}
                  onChange={(e) => setQualityCheckResult(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Result</option>
                  <option value="pass">pass</option>
                  <option value="Fail">Fail</option>
                </select>
                {errors.qualityCheckResult && (
                  <p className="text-red-500">{errors.qualityCheckResult}</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddMilkingData;
