import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MilkingSideBar from "../../../components/MilkingSideBar";
import bgImage from "../../../assets/bg.jpg";


function AddMikingSession(){
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState({
        SessionId: "",
        shedId: "",
        date: "",
        cow_group: "",
        specialNotes: "",
    });

    const handleChange = (e) => {
        setSessionData({ ...sessionData,[e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://localhost:8000/milkingSession", sessionData)
          .then(() => navigate("/milkingsession"))
          .catch((err) => console.log(err));
    };

    return (
        <div className="min-h-screen bg-gray-200">
            <Header />
            <div className="flex h-screen  items-center justify-center min-h-screen bg-center bg-cover"
               style={{ backgroundImage: `url(${bgImage})`}}>
                <MilkingSideBar />
                <div className="flex flex-col items-center w-full ml-[-200px]">
                    
                    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md w-1/4">
                    <h1 className="text-3xl font-bold mb-4 my-4 ">Add Milking Session </h1>

                      <label className="block mb-2 font-semibold">SessionId: </label>
                      <input 
                        type="text"
                        name="SessionId"
                        value={sessionData.SessionId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />

                      <label className="block mb-2 font-semibold">shedId: </label>
                      <input 
                        type="text"
                        name="shedId"
                        value={sessionData.shedId}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />

                      
                      <label className="block mb-2 font-semibold">Date: </label>
                      <input 
                        type="date"
                        name="date"
                        value={sessionData.date}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />

                      <label className="block mb-2 font-semibold">Cow Group: </label>
                      <input 
                        type="text"
                        name="cow_group"
                        value={sessionData.cow_group}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                      />

                      <label className="block mt-4 mb-2 font-semibold">Special Notes:</label>
                      <textarea
                        name="specialNotes"
                        value={sessionData.specialNotes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                      />

                      <button
                        type="submit"
                        className="mt-6 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 ml-40 "
                      >
                        Add Session
                      </button>



                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );

}

export default AddMikingSession;