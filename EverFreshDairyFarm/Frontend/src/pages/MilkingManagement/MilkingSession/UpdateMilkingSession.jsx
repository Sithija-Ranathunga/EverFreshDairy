import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MilkingSideBar from "../../../components/MilkingSideBar";

function UpdateMilkingSession() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState({
        SessionId: "",
        shedId: "",
        date: "",
        cow_group: "",
        specialNotes: "",
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/milkingSession/${id}`)
            .then((response) => {
                const fetchedData = response.data;

                const formattedDate = fetchedData.date
                   ? new Date(fetchedData.date).toISOString().split("T")[0]
                   : "";
                setSessionData({ ...fetchedData, date: formattedDate });

            })
            .catch((err) => console.log(err));
    }, [id]);

        const handleChange = (e) => {
        setSessionData({ ...sessionData, [e.target.name]: e.target.value });


    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/milkingSession/${id}`, sessionData)
            .then(() => navigate("/milkingsession"))
            .catch((err) => console.log(err));
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="flex h-screen">
                <MilkingSideBar />
                <div className="flex-1 p-8 flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-6">Update Milking Session</h1>
                    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-1/3">
                        <label className="block mb-2 font-semibold">Session ID:</label>
                        <input
                            type="text"
                            name="SessionId"
                            value={sessionData.SessionId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />

                        <label className="block mb-2 font-semibold">Shed ID:</label>
                        <input
                            type="text"
                            name="shedId"
                            value={sessionData.shedId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />

                        <label className="block mb-2 font-semibold">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={sessionData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />

                        <label className="block mb-2 font-semibold">Cow Group:</label>
                        <input
                            type="text"
                            name="cow_group"
                            value={sessionData.cow_group}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                            required
                        />

                        <label className="block mb-2 font-semibold">Special Notes:</label>
                        <textarea
                            name="specialNotes"
                            value={sessionData.specialNotes}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md"
                        />

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="mt-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-900"
                            >
                                Update Session
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UpdateMilkingSession;
