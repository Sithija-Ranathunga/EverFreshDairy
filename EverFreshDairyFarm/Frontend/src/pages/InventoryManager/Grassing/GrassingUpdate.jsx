import React, { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import InventorySideBar from "../../../components/InventorySideBar";

function GrassingUpdate() {
  const { id } = useParams();
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // ✅ Function to validate form
  const validateForm = () => {
    let newErrors = {};

    if (!location.trim()) {
      newErrors.location = "Location is required";
    }
    if (!quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(quantity) || Number(quantity) <= 0) {
      newErrors.quantity = "Quantity must be a valid positive number";
    }
    if (!supplier.trim()) {
      newErrors.supplier = "Supplier name is required";
    }
    if (!lastUpdate.trim()) {
      newErrors.lastUpdate = "Last update date is required";
    } else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(lastUpdate)) {
      newErrors.lastUpdate = "Date must be in YYYY/MM/DD format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/inventory/${id}`)
      .then((response) => {
        console.log("Fetched Data:", response.data);
  
        // Ensure response data exists
        const grassData = response.data.inventory || response.data;
  
        setLocation(grassData.location);
        setQuantity(grassData.quantity.toString()); // Convert to string for input field
        setSupplier(grassData.supplier);
  
        // ✅ Format lastUpdate to YYYY/MM/DD
        const formattedDate = new Date(grassData.lastUpdate)
          .toISOString()
          .split("T")[0]
          .replace(/-/g, "/"); // Converts YYYY-MM-DD to YYYY/MM/DD
  
        setLastUpdate(formattedDate);
      })
      .catch((err) => console.error("Error fetching grass data:", err));
  }, [id]);
  
  

  // ✅ Function to update grass data
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    axios
      .put(`http://localhost:8000/inventory/${id}`, {
        location,
        quantity: Number(quantity), // Ensure quantity is a number
        supplier,
        lastUpdate,
      })
      .then((result) => {
        console.log("Grasses Update Successful:", result.data);
        alert("Grass update successful!");
        navigate("/grassing");
      })
      .catch((err) => {
        console.error("Error updating grass:", err);
        alert("Update failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header />
      <div className="flex">
        <InventorySideBar />
        <div className="flex flex-col items-center w-full">
          <h1 className="my-6 text-3xl font-bold text-center">Update Grasses</h1>

          <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
            <form onSubmit={handleUpdate} className="space-y-4 w-96">
              <div>
                <label className="block font-semibold">Grass Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter the grass location"
                />
                {errors.location && <p className="text-red-500">{errors.location}</p>}
              </div>

              <div>
                <label className="block font-semibold">Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter the amount of grass"
                  className="w-full p-2 border rounded-md"
                />
                {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
              </div>

              <div>
                <label className="block font-semibold">Grass Supplier:</label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="Enter the supplier name"
                  className="w-full p-2 border rounded-md"
                />
                {errors.supplier && <p className="text-red-500">{errors.supplier}</p>}
              </div>

              <div>
                <label className="block font-semibold">Last Update:</label>
                <input
                  type="text"
                  value={lastUpdate}
                  onChange={(e) => setLastUpdate(e.target.value)}
                  placeholder="YYYY/MM/DD"
                  className="w-full p-2 border rounded-md"
                />
                {errors.lastUpdate && <p className="text-red-500">{errors.lastUpdate}</p>}
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
      <Footer />
    </div>
  );
}

export default GrassingUpdate;
