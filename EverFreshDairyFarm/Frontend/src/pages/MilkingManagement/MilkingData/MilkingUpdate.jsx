import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MilkingSideBar from "../../../components/MilkingSideBar";

function UpdateMilkingData() {
    const { id } = useParams();
    const [cowId, setCowId] = useState("");
    const [amountofMilk, setAmountOfMilk] = useState("");
    const [temperature, setTemperature] = useState("");
    const [duration, setDuration] = useState("");
    const [qualityCheckResult, setQualityCheckResult] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`http://localhost:8000/milkingData/${id}`)
          .then((response) => {
            const data = response.data;
            setCowId(String(data.cowId));
            setAmountOfMilk(String(data.amountofMilk));
            setTemperature(String(data.temperature));
            setDuration(String(data.duration));
            setQualityCheckResult(data.qualityCheckResult);
          })
          .catch((err) => console.error("Error fetching milking data:", err));
    }, [id]);

    const validateForm = () => {
        let newErrors = {};

        if (!cowId.trim()) newErrors.cowId = "Valid Cow ID is required";
            
        
        if (!amountofMilk.trim()) newErrors.amountofMilk = "Valid milk amount is required";
            
        
        if (!temperature.trim()) newErrors.temperature = "Temperature is required";
        
        if (!duration.trim() || isNaN(Number(duration)) || Number(duration) <= 0)
            newErrors.duration = "Valid duration is required";
        
        if (!qualityCheckResult.trim()) newErrors.qualityCheckResult = "Quality check result is required";
        else if (!["Pass", "Fail"].includes(qualityCheckResult))
            newErrors.qualityCheckResult = "Must be 'Pass' or 'Fail'";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        axios
          .put(`http://localhost:8000/milkingData/${id}`, {
            cowId,
            amountofMilk,
            temperature,
            duration: Number(duration),
            qualityCheckResult,
          })
          .then(() => {
            alert("Milking data updated successfully");
            navigate("/milkingdata");
          })
          .catch((err) => {
            console.error("Error updating milking data:", err);
            alert("Update failed. Please try again.");
          });
    };

    return (
        <div className="min-h-screen font-sans bg-gray-100">
            <Header />
            <div className="flex">
                <MilkingSideBar />
                <div className="flex flex-col items-center w-full">
                  <h1 className="my-6 text-3xl font-bold text-center">Update Milking Data</h1>
                   <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
                    <form onSubmit={handleUpdate} className="space-y-4 w-96">

                        <div>
                            <label className="block font-semibold">Cow ID:</label>
                            <input type="text" value={cowId} onChange={(e) => setCowId(e.target.value)} className="w-full p-2 border rounded-md" />
                            {errors.cowId && <p className="text-red-500">{errors.cowId}</p>}
                        </div>

                        <div>
                            <label className="block font-semibold">Milk Amount:</label>
                            <input type="text" value={amountofMilk} onChange={(e) => setAmountOfMilk(e.target.value)} className="w-full p-2 border rounded-md" />
                            {errors.amountofMilk && <p className="text-red-500">{errors.amountofMilk}</p>}
                        </div>

                        <div>
                            <label className="block font-semibold">Temperature:</label>
                            <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full p-2 border rounded-md" />
                            {errors.temperature && <p className="text-red-500">{errors.temperature}</p>}
                        </div>

                        <div>
                            <label className="block font-semibold">Duration:</label>
                            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full p-2 border rounded-md" />
                            {errors.duration && <p className="text-red-500">{errors.duration}</p>}
                        </div>

                       <div>
                            <label className="block font-semibold">Quality Check Result:</label>
                            <select value={qualityCheckResult} onChange={(e) => setQualityCheckResult(e.target.value)} className="w-full p-2 border rounded-md">
                                <option value="">Select Result</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                            </select>
                            {errors.qualityCheckResult && <p className="text-red-500">{errors.qualityCheckResult}</p>}
                        </div> 

                        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                            Update
                        </button>

                    </form>
                   </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UpdateMilkingData;
