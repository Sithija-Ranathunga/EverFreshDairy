import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import VetSidebar from "../../../components/VetSidebar";

function CheckupsPage() {
  const [checkups, setCheckups] = useState([]);

  useEffect(() => {
    fetchCheckups();
  }, []);

  const fetchCheckups = async () => {
    try {
      const response = await axios.get("http://localhost:8000/vetCheckups");
      if (Array.isArray(response.data.checkups)) {
        setCheckups(response.data.checkups);
      } else {
        console.error("Expected an array but got:", response.data);
        setCheckups([]);
      }
    } catch (err) {
      console.error("Error fetching checkups:", err);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(16);
    doc.text("Veterinary Checkups Report", 10, 20);

    // Set column headers
    doc.setFontSize(12);
    const startY = 30;
    doc.text("Cow ID", 10, startY);
    doc.text("Location", 50, startY);
    doc.text("Checkup Reason", 100, startY);
    doc.text("Diagnosis", 150, startY);
    doc.text("Date", 180, startY);

    // Start printing table rows
    let yPosition = startY + 10;
    checkups.forEach((checkup) => {
      if (yPosition > doc.internal.pageSize.getHeight() - 10) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`${checkup.cowID}`, 10, yPosition);
      doc.text(`${checkup.location}`, 50, yPosition);
      doc.text(`${checkup.CheckupReason}`, 100, yPosition);
      doc.text(`${checkup.Diagnosis}`, 150, yPosition);
      doc.text(`${new Date(checkup.Date).toLocaleDateString()}`, 180, yPosition);
      yPosition += 10;
    });

    // Save the PDF
    doc.save("Veterinary-Checkups-Report.pdf");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <div className="ml-4 my-4 rounded-xl overflow-hidden h-[calc(100vh-8rem)]">
          <VetSidebar />
        </div>
        
        <div className="flex-1 pl-8 pr-4">
          <h1 className="mt-10 mb-6 text-3xl font-bold text-gray-800">Checkup Records</h1>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-700">Checkup Details</h3>
            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Cow ID</th>
                  <th className="p-3 text-left">Location</th>
                  <th className="p-3 text-left">Checkup Reason</th>
                  <th className="p-3 text-left">Diagnosis</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {checkups.length > 0 ? (
                  checkups.map((checkup) => (
                    <tr key={checkup._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{checkup.cowID}</td>
                      <td className="p-3">{checkup.location}</td>
                      <td className="p-3">{checkup.CheckupReason}</td>
                      <td className="p-3">{checkup.Diagnosis}</td>
                      <td className="p-3">{formatDate(checkup.Date)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No checkup records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CheckupsPage;