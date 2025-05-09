import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import MilkingSideBar from "../../../components/MilkingSideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MilkingData() {
  const navigate = useNavigate();
  const [milkingData, setMilkingData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/milkingData")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMilkingData(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setMilkingData([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/milkingData/${id}`)
      .then(() => {
        setMilkingData((prevData) =>
          prevData.filter((item) => item._id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  // Filter milking data based on Cow ID search
  const filteredMilkingData = milkingData.filter((data) =>
    data.cowId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <Header />
      <div className="flex flex-1">
        <MilkingSideBar />
        {/* Scrollable content area */}
        <div className="flex-1 pl-8 py-4 overflow-y-auto max-h-[calc(100vh-112px)]">
          <h1 className="mt-6 mb-8 text-3xl font-bold">Milking Data</h1>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold">Milking Records</h2>
            <button
              className="px-4 py-2 text-white bg-blue-900 mr-32 rounded-lg hover:bg-blue-700"
              onClick={() => navigate("/addmilkingdata")}
            >
              Add Record
            </button>
          </div>
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="🔍Search..."
              className="w-1/6 px-4 py-2 border rounded-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="w-4/5 mx-auto my-4 bg-white shadow-md rounded-lg">
            <thead className="text-white bg-blue-900">
              <tr>
                <th className="p-4 text-center">Cow ID</th>
                <th className="p-4 text-center">Milk Amount</th>
                <th className="p-4 text-center">Temperature</th>
                <th className="p-4 text-center">Duration</th>
                <th className="p-4 text-center">Quality Check</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredMilkingData.length > 0 ? (
                filteredMilkingData.map((data) => (
                  <tr
                    key={data._id}
                    className="border-b border-gray-800 hover:bg-gray-100"
                  >
                    <td className="p-4 text-center">{data.cowId}</td>
                    <td className="p-4 text-center">{data.amountofMilk}</td>
                    <td className="p-4 text-center">{data.temperature}°C</td>
                    <td className="p-4 text-center">{data.duration} min</td>
                    <td
                      className={`p-4 text-center font-bold ${
                        data.qualityCheckResult === "pass"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {data.qualityCheckResult}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() =>
                          navigate(`/updatemilkingdata/${data._id}`)
                        }
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-4"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(data._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500">
                    No records available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MilkingData;
