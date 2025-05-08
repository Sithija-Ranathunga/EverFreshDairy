import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";

function Sessionreport() {
  const navigate = useNavigate();
  const [session, setSession] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/Grassing")
      .then((response) => {
        if (Array.isArray(response.data.Session)) {
          setSession(response.data.Session);
        } else {
          console.error("Expected an array but got:", response.data);
          setSession([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
    doc.text("Grassing Session Report", doc.internal.pageSize.getWidth()/2, 35, { align: 'center' });

    // Add metadata
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 10, 50);
    doc.text(`Total Records: ${session.length}`, 10, 57);

    // Add table headers with styling
    const startY = 70;
    doc.setFillColor(240, 240, 240);
    doc.rect(10, startY - 5, doc.internal.pageSize.getWidth() - 20, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    
    // Define column widths and positions
    const columns = {
      sessionId: { x: 20, width: 40 },
      shedId: { x: 70, width: 40 },
      cowGroup: { x: 120, width: 40 },
      date: { x: 170, width: 30 }
    };

    // Add headers
    doc.text("Session ID", columns.sessionId.x, startY);
    doc.text("Shed ID", columns.shedId.x, startY);
    doc.text("Cow Group", columns.cowGroup.x, startY);
    doc.text("Date", columns.date.x, startY);

    // Add table content
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    let yPosition = startY + 10;

    session.forEach((s, index) => {
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
        doc.text("Grassing Session Report (Continued)", doc.internal.pageSize.getWidth()/2, 15, { align: 'center' });
        
        // Reset text color for content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
      }

      doc.text(`${s.SessionId}`, columns.sessionId.x, yPosition);
      doc.text(`${s.ShedId}`, columns.shedId.x, yPosition);
      doc.text(`${s.CowGroup}`, columns.cowGroup.x, yPosition);
      const formattedDate = new Intl.DateTimeFormat("en-GB").format(new Date(s.Date));
      doc.text(formattedDate, columns.date.x, yPosition);
      
      yPosition += 10;
    });

    // Add footer with page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth()/2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }

    // Save the PDF
    doc.save("Grassing-Session-Report.pdf");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Grassing Session Report</h2>
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="text-white bg-blue-600">
          <tr>
            <th className="p-4 text-center">Session ID</th>
            <th className="p-4 text-center">Shed ID</th>
            <th className="p-4 text-center">Cow Group</th>
            <th className="p-4 text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          {session.length > 0 ? (
            session.map((s) => (
              <tr
                key={s._id}
                className="border-b border-gray-300 hover:bg-gray-100"
              >
                <td className="p-4 text-center">{s.SessionId}</td>
                <td className="p-4 text-center">{s.ShedId}</td>
                <td className="p-4 text-center">{s.CowGroup}</td>
                <td className="p-4 text-center">
                  {new Intl.DateTimeFormat("en-GB").format(new Date(s.Date))}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                No session data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-900 rounded-md hover:bg-blue-600"
        onClick={downloadPDF}
      >
        Generate Report
      </button>
    </div>
  );
}

export default Sessionreport;
