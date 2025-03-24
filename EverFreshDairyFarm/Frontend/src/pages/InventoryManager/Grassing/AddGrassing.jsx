import React, { useState } from "react";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InventorySideBar from "../../../components/InventorySideBar";

function AddGrassing() {
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({}); // Stores validation errors
  const navigate = useNavigate();

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
    if (!date.trim()) {
      newErrors.date = "Last update date is required";
    } else if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(date)) {
      newErrors.date = "Date must be in YYYY/MM/DD format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const requestData = {
      location,
      quantity: Number(quantity),
      supplier,
      lastUpdate: date,
    };

    axios
      .post("http://localhost:8000/inventory", requestData)
      .then((result) => {
        console.log("Add Successful..", result.data);
        alert("Grassess are stored...");
      })
      .catch((err) => {
        console.error("Grassess add failed", err);
        alert("Grassess store failed. Please try again...");
      });
  };

  return (
    <div className="min-h-screen font-sans bg-gray-100">
      <Header />
      <div className="flex">
        <InventorySideBar />
        <div className="flex flex-col items-center w-full">
          <h1 className="my-6 text-3xl font-bold text-center">Add Grassess</h1>

          <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4 w-96">
              <div>
                <label className="block font-semibold">Grass Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter the location"
                  className="w-full p-2 border rounded-md"
                />
                {errors.location && <p className="text-red-500">{errors.location}</p>}
              </div>

              <div>
                <label className="block font-semibold">Quantity:</label>
                <input
                  type="text"
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="YYYY/MM/DD"
                  className="w-full p-2 border rounded-md"
                />
                {errors.date && <p className="text-red-500">{errors.date}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddGrassing;
