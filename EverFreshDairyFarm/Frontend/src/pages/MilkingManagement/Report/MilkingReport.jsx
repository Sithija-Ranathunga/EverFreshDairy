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

    // Function to download the PDF
    const downloadPDF = () => {
        const doc = new jsPDF();

        // Add a title
        doc.setFontSize(16);
        doc.text("Milking Report", 10, 20);

        // Set column headers
        doc.setFontSize(12);
        const startY = 30;
        doc.text("Cow ID", 10, startY);
        doc.text("Milk Amount (L)", 50, startY);
        doc.text("Temperature (°C)", 100, startY);
        doc.text("Duration (min)", 150, startY);
        doc.text("Quality", 180, startY);

        // Start printing table rows
        let yPosition = startY + 10;
        milkingData.forEach((g) => {
            if (yPosition > doc.internal.pageSize.getHeight() - 10) {
                doc.addPage();
                yPosition = 20;
            }
            doc.text(`${g.cowId}`, 10, yPosition);
            doc.text(`${g.amountofMilk} L`, 50, yPosition);
            doc.text(`${g.temperature}°C`, 100, yPosition);
            doc.text(`${g.duration} min`, 150, yPosition);
            doc.text(`${g.qualityCheckResult}`, 180, yPosition);
            yPosition += 10;
        });

        // Save the PDF
        doc.save("Milking-Report.pdf");
    };

    return (
        <div>
            <Header />
            <div className="flex h-screen">
                <MilkingSideBar />
                <div className="flex-1 pl-8 bg-gray-100">
                    <h1 className="mt-10 mb-8 text-3xl font-bold">Milking Data</h1>

                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-semibold">Milking Records</h2>
                        <button
                            onClick={downloadPDF}
                            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-800"
                        >
                            Download PDF
                        </button>
                    </div>

                    <table className="w-4/5 mx-auto my-4 bg-white shadow-md rounded-lg">
                        <thead className="text-white bg-green-800">
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
                                    <tr key={g._id} className="border-b border-gray-800 hover:bg-gray-100">
                                        <td className="p-4 text-center">{g.cowId}</td>
                                        <td className="p-4 text-center">{g.amountofMilk} L</td>
                                        <td className="p-4 text-center">{g.temperature}°C</td>
                                        <td className="p-4 text-center">{g.duration} min</td>
                                        <td className={`p-4 text-center font-bold ${g.qualityCheckResult === "pass" ? "text-green-600" : "text-red-600"}`}>
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
