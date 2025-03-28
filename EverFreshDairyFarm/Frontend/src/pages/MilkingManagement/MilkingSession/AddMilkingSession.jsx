import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MilkingSideBar from "../../../components/MilkingSideBar";
import { assets } from "../../../assets/assets";
import bgImage from "../../../assets/bg.jpg";

function AddMilkingSession() {
    const [sessionId, setSessionId] = useState("");
    const [shedId, setShedId] = useState("");
    const [date, setDate] = useState("");
    const [cowGroup, setCowGroup] = useState("");
    const [specialNotes, setSpecialNotes] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};

        if (!sessionId.trim()) newErrors.sessionId = "Session ID is required";
        if (!shedId.trim()) newErrors.shedId = "Shed ID is required";
        
        // Validate date
        if (!date.trim()) {
            newErrors.date = "Date is required";
        } else {
            const selectedDate = new Date(date);
            const currentDate = new Date();
            
            if (isNaN(selectedDate.getTime())) {
                newErrors.date = "Invalid date format";
            } else if (selectedDate > currentDate) {
                newErrors.date = "Date cannot be in the future";
            }
        }

        if (!cowGroup.trim()) newErrors.cowGroup = "Cow group is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const requestData = {
            SessionId: sessionId,
            shedId: shedId,
            date: new Date(date),
            cow_group: cowGroup,
            specialNotes: specialNotes || undefined, 
        };

        // Log request data to the console for debugging
        console.log("Request Data:", requestData);

        axios
            .post("http://localhost:8000/milkingSession", requestData)
            .then(() => {
                alert("Milking session added successfully");
                navigate("/milkingsession");
            })
            .catch((err) => {
                // Log error response to get more details
                console.error("Error adding milking session:", err.response);
                if (err.response && err.response.data) {
                    alert("Failed to add milking session: " + err.response.data.message);
                } else {
                    alert("Failed to add milking session. Please try again.");
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
                        <form onSubmit={handleSubmit} className="space-y-1 w-80 space-x-4">
                            <h1 className="my-5 mb-10 text-3xl font-bold text-center">Add Milking Session</h1>
                            
                            <div>
                                <label className="block font-semibold">Session ID:</label>
                                <input
                                    type="text"
                                    value={sessionId}
                                    onChange={(e) => setSessionId(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.sessionId && <p className="text-red-500">{errors.sessionId}</p>}
                            </div>
                            
                            <div>
                                <label className="block font-semibold">Shed ID:</label>
                                <input
                                    type="text"
                                    value={shedId}
                                    onChange={(e) => setShedId(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.shedId && <p className="text-red-500">{errors.shedId}</p>}
                            </div>
                            
                            <div>
                                <label className="block font-semibold">Date:</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.date && <p className="text-red-500">{errors.date}</p>}
                            </div>
                            
                            <div>
                                <label className="block font-semibold">Cow Group:</label>
                                <input
                                    type="text"
                                    value={cowGroup}
                                    onChange={(e) => setCowGroup(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                />
                                {errors.cowGroup && <p className="text-red-500">{errors.cowGroup}</p>}
                            </div>
                            
                            <div>
                                <label className="block font-semibold">Special Notes (Optional):</label>
                                <textarea
                                    value={specialNotes}
                                    onChange={(e) => setSpecialNotes(e.target.value)}
                                    className="w-full p-2 border rounded-md"
                                    rows="3"
                                />
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

export default AddMilkingSession;