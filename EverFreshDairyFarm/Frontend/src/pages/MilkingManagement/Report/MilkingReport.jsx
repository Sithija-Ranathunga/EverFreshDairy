import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { Header } from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import MilkingSideBar from "../../../components/MilkingSideBar";

function MilkingReport() {
  const [milkingData, setMilkingData] = useState([]);

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

  // Update the downloadPDF function
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add company logo and header
    doc.setFillColor(13, 71, 161);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, "F");

    // Add company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text(
      "Ever Fresh Dairy Farm",
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    // Add report title
    doc.setFontSize(18);
    doc.text(
      "Milking Management Report",
      doc.internal.pageSize.getWidth() / 2,
      35,
      { align: "center" }
    );

    // Add metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 10, 50);
    doc.text(`Total Records: ${milkingData.length}`, 10, 57);

    // Calculate totals for summary
    const totalMilk = milkingData.reduce(
      (sum, item) => sum + parseFloat(item.amountofMilk),
      0
    );
    const passCount = milkingData.filter(
      (item) => item.qualityCheckResult === "pass"
    ).length;
    doc.text(`Total Milk Collected: ${totalMilk.toFixed(2)} L`, 80, 57);
    doc.text(
      `Quality Pass Rate: ${((passCount / milkingData.length) * 100).toFixed(
        1
      )}%`,
      150,
      57
    );

    // Add table headers with styling
    const startY = 70;
    doc.setFillColor(240, 240, 240);
    doc.rect(10, startY - 5, doc.internal.pageSize.getWidth() - 20, 10, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    // Define column widths and positions
    const columns = {
      cowId: { x: 20, width: 30 },
      milk: { x: 60, width: 40 },
      temp: { x: 100, width: 40 },
      duration: { x: 140, width: 30 },
      quality: { x: 170, width: 30 },
    };

    // Add headers
    doc.text("Cow ID", columns.cowId.x, startY);
    doc.text("Milk (L)", columns.milk.x, startY);
    doc.text("Temp (°C)", columns.temp.x, startY);
    doc.text("Duration", columns.duration.x, startY);
    doc.text("Quality", columns.quality.x, startY);

    // Add table content
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    let yPosition = startY + 10;

    milkingData.forEach((item, index) => {
      // Add alternate row coloring
      if (index % 2 === 0) {
        doc.setFillColor(249, 249, 249);
        doc.rect(
          10,
          yPosition - 5,
          doc.internal.pageSize.getWidth() - 20,
          10,
          "F"
        );
      }

      // Add new page if needed
      if (yPosition > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 20;

        // Add header to new page
        doc.setFillColor(13, 71, 161);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 20, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text(
          "Milking Management Report (Continued)",
          doc.internal.pageSize.getWidth() / 2,
          15,
          { align: "center" }
        );

        // Reset text color for content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
      }

      // Set text color based on quality check result
      doc.setTextColor(item.qualityCheckResult === "pass" ? 0 : 255, 0, 0);

      doc.text(`${item.cowId}`, columns.cowId.x, yPosition);
      doc.text(`${item.amountofMilk}`, columns.milk.x, yPosition);
      doc.text(`${item.temperature}°C`, columns.temp.x, yPosition);
      doc.text(`${item.duration} min`, columns.duration.x, yPosition);
      doc.text(`${item.qualityCheckResult}`, columns.quality.x, yPosition);

      // Reset text color to black
      doc.setTextColor(0, 0, 0);

      yPosition += 10;
    });

    // Add summary section
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Summary:", 10, yPosition);
    yPosition += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`Total Milk Collection: ${totalMilk.toFixed(2)} L`, 20, yPosition);
    yPosition += 7;
    doc.text(
      `Quality Pass Rate: ${((passCount / milkingData.length) * 100).toFixed(
        1
      )}%`,
      20,
      yPosition
    );
    yPosition += 7;
    doc.text(`Total Records: ${milkingData.length}`, 20, yPosition);

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    // Save the PDF
    doc.save("milking-management-report.pdf");
  };

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
              onClick={downloadPDF}
              className="px-4 py-2 text-white mr-32 bg-blue-600 rounded-lg hover:bg-blue-800"
            >
              Download PDF
            </button>
          </div>
          <table className="w-4/5 mx-auto my-4 bg-white shadow-md rounded-lg">
            <thead className="text-white bg-blue-900">
              <tr>
                <th className="p-4 text-center">Cow ID</th>
                <th className="p-4 text-center">Milk Amount</th>
                <th className="p-4 text-center">Temperature</th>
                <th className="p-4 text-center">Duration</th>
                <th className="p-4 text-center">Quality Check</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {milkingData.length > 0 ? (
                milkingData.map((g) => (
                  <tr
                    key={g._id}
                    className="border-b border-gray-800 hover:bg-gray-100"
                  >
                    <td className="p-4 text-center">{g.cowId}</td>
                    <td className="p-4 text-center">{g.amountofMilk} </td>
                    <td className="p-4 text-center">{g.temperature}°C</td>
                    <td className="p-4 text-center">{g.duration} min</td>
                    <td
                      className={`p-4 text-center font-bold ${
                        g.qualityCheckResult === "pass"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {g.qualityCheckResult}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
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

export default MilkingReport;
