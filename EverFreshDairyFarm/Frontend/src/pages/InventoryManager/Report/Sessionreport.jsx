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
    // Create a new jsPDF document (default: A4, portrait)
    const doc = new jsPDF();

    // Add title to the PDF
    doc.setFontSize(16);
    doc.text("Grassing Session Report", 10, 20);

    // Add table headers
    doc.setFontSize(12);
    const startY = 30;
    doc.text("Session ID", 10, startY);
    doc.text("Shed ID", 60, startY);
    doc.text("Cow Group", 110, startY);
    doc.text("Date", 160, startY);

    // Start printing table rows below the header
    let yPosition = startY + 10;
    session.forEach((s) => {
      // If we are near the bottom of the page, add a new page
      if (yPosition > doc.internal.pageSize.getHeight() - 10) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`${s.SessionId}`, 10, yPosition);
      doc.text(`${s.ShedId}`, 60, yPosition);
      doc.text(`${s.CowGroup}`, 110, yPosition);
      const formattedDate = new Intl.DateTimeFormat("en-GB").format(new Date(s.Date));
      doc.text(formattedDate, 160, yPosition);
      yPosition += 10;
    });

    // Save the generated PDF as "session-report.pdf"
    doc.save("session-report.pdf");
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
