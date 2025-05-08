import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function Grassingreport() {
  const navigate = useNavigate();
  const [grass, setGrass] = useState([]);
  const [expiredCount, setExpiredCount] = useState(0);
  const [inStoreCount, setInStoreCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8000/inventory")
      .then((response) => {
        if (Array.isArray(response.data.inventory)) {
          const inventory = response.data.inventory;
          const today = new Date();
          let expired = 0;
          let inStore = 0;

          inventory.forEach((item) => {
            const lastUpdateDate = new Date(item.lastUpdate);
            const diffInDays =
              (today - lastUpdateDate) / (1000 * 3600 * 24);
            if (diffInDays > 5) expired++;
            else inStore++;
          });

          setExpiredCount(expired);
          setInStoreCount(inStore);
          setGrass(inventory);
        } else {
          console.error("Expected an array but got:", response.data);
          setGrass([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add company logo and header
    doc.setFillColor(13, 71, 161);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 40, 'F');
    
    // Add company name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text("Ever Fresh Dairy Farm", doc.internal.pageSize.getWidth()/2, 20, { align: 'center' });
    
    // Add report title
    doc.setFontSize(18);
    doc.text("Grassing Inventory Report", doc.internal.pageSize.getWidth()/2, 35, { align: 'center' });

    // Add metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 10, 50);
    doc.text(`Total Records: ${grass.length}`, 10, 57);
    doc.text(`Expired Items: ${expiredCount}`, 80, 57);
    doc.text(`In Store Items: ${inStoreCount}`, 150, 57);

    // Add table headers with styling
    const startY = 70;
    doc.setFillColor(240, 240, 240);
    doc.rect(10, startY - 5, doc.internal.pageSize.getWidth() - 20, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    
    // Define column widths and positions
    const columns = {
      location: { x: 20, width: 40 },
      quantity: { x: 70, width: 30 },
      supplier: { x: 110, width: 40 },
      lastUpdate: { x: 160, width: 30 }
    };

    // Add headers
    doc.text("Location", columns.location.x, startY);
    doc.text("Quantity", columns.quantity.x, startY);
    doc.text("Supplier", columns.supplier.x, startY);
    doc.text("Last Update", columns.lastUpdate.x, startY);

    // Add table content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    let yPosition = startY + 10;

    grass.forEach((g, index) => {
      // Add alternate row coloring
      if (index % 2 === 0) {
        doc.setFillColor(249, 249, 249);
        doc.rect(10, yPosition - 5, doc.internal.pageSize.getWidth() - 20, 10, 'F');
      }

      // Check if item is expired
      const diffDays = (new Date() - new Date(g.lastUpdate)) / (1000 * 3600 * 24);
      if (diffDays > 5) {
        doc.setTextColor(255, 0, 0); // Red text for expired items
      } else {
        doc.setTextColor(0, 0, 0); // Black text for normal items
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
        doc.text("Grassing Inventory Report (Continued)", doc.internal.pageSize.getWidth()/2, 15, { align: 'center' });
        
        // Reset text color for content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
      }

      doc.text(`${g.location}`, columns.location.x, yPosition);
      doc.text(`${g.quantity}`, columns.quantity.x, yPosition);
      doc.text(`${g.supplier}`, columns.supplier.x, yPosition);
      const formattedDate = new Intl.DateTimeFormat("en-GB").format(new Date(g.lastUpdate));
      doc.text(formattedDate, columns.lastUpdate.x, yPosition);
      
      yPosition += 10;
    });

    // Add summary section at the end
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Summary:", 10, yPosition);
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Grass Records: ${grass.length}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Expired Items: ${expiredCount}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Items In Store: ${inStoreCount}`, 20, yPosition);

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth()/2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }

    // Save the PDF
    doc.save("grassing-inventory-report.pdf");
  };

  return (
    <div className="p-6 mb-10 bg-white rounded-lg shadow-md">
      {/* Report Content */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">Grassing Report</h2>
        <table className="w-full bg-white rounded-lg shadow-md">
          <thead className="text-white bg-blue-600">
            <tr>
              <th className="p-4 text-center">Location</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Supplier</th>
              <th className="p-4 text-center">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {grass.length > 0 ? (
              grass.map((g) => {
                const diffDays =
                  (new Date() - new Date(g.lastUpdate)) / (1000 * 3600 * 24);
                const isExpired = diffDays > 5;
                return (
                  <tr
                    key={g._id}
                    className={`border-b hover:bg-gray-100 ${
                      isExpired ? "bg-red-100 text-red-700" : ""
                    }`}
                  >
                    <td className="p-4 text-center">{g.location}</td>
                    <td className="p-4 text-center">{g.quantity}</td>
                    <td className="p-4 text-center">{g.supplier}</td>
                    <td className="p-4 text-center">
                      {new Intl.DateTimeFormat("en-GB").format(
                        new Date(g.lastUpdate)
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-900 rounded-md hover:bg-blue-600"
        onClick={downloadPDF}
      >
        Generate Report
      </button>
    </div>
  );
}

export default Grassingreport;
