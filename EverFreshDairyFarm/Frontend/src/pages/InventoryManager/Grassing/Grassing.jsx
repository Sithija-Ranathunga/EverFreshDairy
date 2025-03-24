import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import InventorySideBar from "../../../components/InventorySideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Grassing() {
  const navigate = useNavigate();
  const [grass, setGrass] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/inventory")
      .then((response) => {
        if (Array.isArray(response.data.inventory)) {
          setGrass(response.data.inventory);
        } else {
          console.error("Expected an array but got:", response.data);
          setGrass([]); // Ensure it's an array
        }
      })
      .catch((err) => console.log(err));
  }, []); // Add dependency array to prevent re-fetching on every render

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/inventory/${id}`) // Added "/"
      .then((res) => {
        console.log(res);
        setGrass((prevGrass) => prevGrass.filter((item) => item._id !== id)); // Remove item from state instead of full reload
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <InventorySideBar />

        <div className="flex-1 pl-8 bg-gray-100">
          <h1 className="mt-10 mb-6 text-3xl font-bold">Dashboard</h1>

          <div className="flex items-center justify-center gap-20 mb-10">
            <div className="flex flex-col items-center py-2 bg-green-300 rounded-md px-9">
              <h2 className="text-xl font-bold">100</h2>
              <p>In-Store</p>
            </div>

            <div className="flex flex-col items-center py-2 bg-green-300 rounded-md px-9">
              <h2 className="text-xl font-bold">10</h2>
              <p>Expired</p>
            </div>
          </div>

          <div className="flex items-center justify-around mb-4">
            <h2 className="text-xl font-semibold">Grassing Details</h2>
            <button
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              onClick={() => navigate("/addgrass")}
            >
              Add Item
            </button>
          </div>

          <table className=" w-4/5 mx-auto my-[2.22vh] bg-white shadow-md rounded-lg">
            <thead className="text-white bg-blue-500">
              <tr>
                <th className=" p-[1.6vh] text-center">Location</th>
                <th className=" p-[1.6vh] text-center">Quantity</th>
                <th className=" p-[1.6vh] text-center">Supplier</th>
                <th className=" p-[1.6vh] text-center">Last Update</th>
                <th className=" p-[1.6vh] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {Array.isArray(grass) && grass.length > 0 ? (
                grass.map((Grass) => (
                  <tr
                    key={Grass._id}
                    className="border-b border-gray-800 hover:bg-gray-100"
                  >
                    <td className="p-[1.6vh] text-center">{Grass.location}</td>
                    <td className="p-[1.6vh] text-center">{Grass.quantity}</td>
                    <td className="p-[1.6vh] text-center">{Grass.supplier}</td>
                    <td className="p-[1.6vh] text-center">
                      {new Intl.DateTimeFormat("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(new Date(Grass.lastUpdate))}
                    </td>

                    <td className="p-[1.6vh] text-center">
                      <button
                        onClick={() => navigate(`/grassingupdate/${Grass._id}`)}
                        className="px-[1.25vh] py-[0.9vh] text-[1.42vh] bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-6"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(Grass._id)}
                        className="px-[1.25vh] py-[0.9vh] text-[1.42vh] bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No data available
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

export default Grassing;
