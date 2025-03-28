<<<<<<< Updated upstream
import React, { useContext, useEffect, useState } from "react";
=======
import React, { useEffect, useState, useContext } from "react";
>>>>>>> Stashed changes
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import InventorySideBar from "../../../components/InventorySideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../../Content/AppContent";
<<<<<<< Updated upstream
import { assets } from "../../../assets/assets";

=======
>>>>>>> Stashed changes

function Grassing() {
  const navigate = useNavigate();
  const [grass, setGrass] = useState([]);
<<<<<<< Updated upstream
  const [expiredCount, setExpiredCount] = useState(0);
  const [inStoreQuantity, setInStoreQuantity] = useState(0);
  const {userData} = useContext(AppContent);
  
=======
  const {userData} = useContext(AppContent)
>>>>>>> Stashed changes

  useEffect(() => {
    axios
      .get("http://localhost:8000/inventory")
      .then((response) => {
        if (Array.isArray(response.data.inventory)) {
          const inventory = response.data.inventory;
          const today = new Date();
          let expired = 0;
          let totalInStore = 0;

          inventory.forEach((item) => {
            const lastUpdateDate = new Date(item.lastUpdate);
            const diffInDays = (today - lastUpdateDate) / (1000 * 3600 * 24);
            if (diffInDays > 5) {
              expired++;
            } else {
              // Sum the quantity (ensure it's a number)
              totalInStore += Number(item.quantity) || 0;
            }
          });

          if (expired > 0) {
            alert("Warning: Some grass items have expired (last update over 5 days ago).");
          }
          // Alert if total in-store quantity is below 50
          if (totalInStore < 50) {
            alert("Warning: Grassing store is low. Inventory is below 50.");
          }

          setExpiredCount(expired);
          setInStoreQuantity(totalInStore);
          setGrass(inventory);
        } else {
          console.error("Expected an array but got:", response.data);
          setGrass([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/inventory/${id}`)
      .then(() => {
        setGrass((prevGrass) => prevGrass.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    // inside return()
<div className="min-h-screen bg-sky-100"> 


  <Header />
  <div className="flex min-h-screen ">
    <InventorySideBar />

    <div className="flex-1 pl-8">
      <h1 className="mt-10 mb-6 text-3xl font-bold text-[#14532d]">Dashboard</h1>

      <div className="flex items-center justify-center gap-20 mb-10">
        <div className="flex flex-col items-center px-20 py-5 bg-[#34d399] text-white rounded-md shadow-md">
          <h2 className="text-xl font-bold">{inStoreQuantity} kg</h2>
          <p className="text-xl font-bold">In-Store</p>
        </div>

        <div className="flex flex-col items-center px-20 py-5 bg-[#059669] text-white rounded-md shadow-md">
          <h2 className="text-xl font-bold">{expiredCount}</h2>
          <p className="text-xl font-bold">Expired</p>
        </div>
      </div>

      <div className="flex items-center justify-around mb-4">
        <h2 className="text-2xl font-semibold text-[#14532d]">Grassing Details</h2>
        <button
          className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={() => navigate("/addgrass")}
        >
          + Add Item
        </button>
      </div>

      <table className="w-4/5 mx-auto my-6 bg-white rounded-lg shadow-md">
        <thead className="text-white bg-blue-900">
          <tr>
            <th className="p-4 text-center">Location</th>
            <th className="p-4 text-center">Quantity</th>
            <th className="p-4 text-center">Supplier</th>
            <th className="p-4 text-center">Last Update</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {grass.length > 0 ? (
            grass.map((g) => {
              const diffDays = (new Date() - new Date(g.lastUpdate)) / (1000 * 3600 * 24);
              const isExpired = diffDays > 5;

              return (
                <tr
                  key={g._id}
                  className={`border-b hover:bg-[#f0fdf4] ${
                    isExpired ? "bg-red-100 text-red-700" : ""
                  }`}
                >
                  <td className="p-4 text-center">{g.location}</td>
                  <td className="p-4 text-center">{g.quantity}kg</td>
                  <td className="p-4 text-center">{g.supplier}</td>
                  <td className="p-4 text-center">
                    {new Intl.DateTimeFormat("en-GB").format(new Date(g.lastUpdate))}
                  </td>
                  <td className="p-4 text-center">
  <button
    onClick={() => navigate(`/grassingupdate/${g._id}`)}
    className="px-3 py-1 mr-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
  >
    Update
  </button>
  <button
    onClick={() => handleDelete(g._id)}
    className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
  >
    Delete
  </button>
</td>

                </tr>
              );
            })
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
