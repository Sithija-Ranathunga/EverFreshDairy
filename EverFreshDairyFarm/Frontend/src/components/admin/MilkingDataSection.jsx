import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

export default function MilkingDataSection() {
    const [trendData, setTrendData] = useState({});
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        axios.get("/api/alerts/analyze");
        axios.get("/api/milking").then(res => {
            const grouped = {};
            res.data.forEach(r => {
                const date = new Date(r.createdAt).toISOString().split('T')[0];
                if (!grouped[r.cowId]) grouped[r.cowId] = [];
                grouped[r.cowId].push({ date, amount: parseFloat(r.amountofMilk) });
            });
            setTrendData(grouped);
        });
        axios.get("/api/alerts").then(res => {
            if (Array.isArray(res.data)) {
                setAlerts(res.data);
            } else if (Array.isArray(res.data.alerts)) {
                setAlerts(res.data.alerts);
            } else {
                setAlerts([]);
            }
        });
        
    }, []);

    return (
        <div>
            <h3 className="text-xl font-bold mb-2">Milking Trends</h3>
            {Object.keys(trendData).map(cowId => (
                <div key={cowId} className="mb-6">
                    <h4 className="font-semibold mb-1">Cow {cowId}</h4>
                    <LineChart width={500} height={300} data={trendData[cowId]}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                    </LineChart>
                </div>
            ))}

            <h3 className="text-xl font-bold mt-6 mb-2">Active Alerts</h3>
            {alerts.length === 0 ? (
                <p className="text-green-600">No active alerts 🎉</p>
            ) : (
                alerts.map(alert => (
                    <div key={alert._id} className="bg-red-100 text-red-700 p-2 rounded mb-2">
                        ⚠ {alert.message}
                    </div>
                ))
            )}
        </div>
    );
}
