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
    
    // Add company logo and header
    doc.setFillColor(13, 71, 161); // dark blue header
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
    
    // Add company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text("Ever Fresh Dairy Farm", doc.internal.pageSize.getWidth()/2, 20, { align: 'center' });
    
    // Add report title
    doc.setFontSize(18);
    doc.text("Veterinary Checkups Report", doc.internal.pageSize.getWidth()/2, 35, { align: 'center' });

    // Add metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 10, 50);
    doc.text(`Total Records: ${checkups.length}`, 10, 57);

    // Add table headers with styling
    const startY = 70;
    doc.setFillColor(240, 240, 240);
    doc.rect(10, startY - 5, doc.internal.pageSize.getWidth() - 20, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    
    // Define column widths and positions
    const columns = {
      cowID: { x: 15, width: 30 },
      location: { x: 45, width: 35 },
      reason: { x: 80, width: 45 },
      diagnosis: { x: 125, width: 45 },
      date: { x: 170, width: 30 }
    };

    // Add headers
    doc.text("Cow ID", columns.cowID.x, startY);
    doc.text("Location", columns.location.x, startY);
    doc.text("Reason", columns.reason.x, startY);
    doc.text("Diagnosis", columns.diagnosis.x, startY);
    doc.text("Date", columns.date.x, startY);

    // Add table content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    let yPosition = startY + 10;

    checkups.forEach((checkup, index) => {
      // Add alternate row coloring
      if (index % 2 === 0) {
        doc.setFillColor(249, 249, 249);
        doc.rect(10, yPosition - 5, doc.internal.pageSize.getWidth() - 20, 10, 'F');
      }

      // Add new page if needed
      if (yPosition > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 20;
        
        // Add header to new page
        doc.setFillColor(13, 71, 161);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text("Veterinary Checkups Report (Continued)", doc.internal.pageSize.getWidth()/2, 15, { align: 'center' });
        
        // Reset text color for content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
      }

      // Add row content with word wrap
      const splitReason = doc.splitTextToSize(checkup.CheckupReason, columns.reason.width);
      const splitDiagnosis = doc.splitTextToSize(checkup.Diagnosis, columns.diagnosis.width);

      doc.text(`${checkup.cowID}`, columns.cowID.x, yPosition);
      doc.text(`${checkup.location}`, columns.location.x, yPosition);
      doc.text(splitReason, columns.reason.x, yPosition);
      doc.text(splitDiagnosis, columns.diagnosis.x, yPosition);
      doc.text(`${formatDate(checkup.Date)}`, columns.date.x, yPosition);

      // Calculate maximum height needed for this row
      const lineHeight = 7;
      const reasonLines = splitReason.length;
      const diagnosisLines = splitDiagnosis.length;
      const maxLines = Math.max(reasonLines, diagnosisLines, 1);
      
      yPosition += lineHeight * maxLines;
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth()/2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }

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
          <h1 className="mt-10 mb-6 text-3xl font-bold text-gray-800">Checkup Reports </h1>

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-700">Checkup Details....</h3>
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
              <thead className="bg-sky-900 text-white">
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