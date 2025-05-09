import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { FiAlertTriangle } from 'react-icons/fi';

const MilkingDataSection = () => {
  const [milkingData, setMilkingData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [milkingResponse, alertsResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/milking/all'),
          axios.get('http://localhost:8000/api/alerts')
        ]);
        
        setMilkingData(milkingResponse.data);
        setAlerts(alertsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const processChartData = () => {
    const cowMap = {};
    milkingData.forEach(data => {
      if (!cowMap[data.cowId]) {
        cowMap[data.cowId] = {
          cowId: data.cowId,
          milkAmount: 0,
          count: 0
        };
      }
      cowMap[data.cowId].milkAmount += parseFloat(data.amountofMilk);
      cowMap[data.cowId].count += 1;
    });
    return Object.values(cowMap).map(cow => ({
      cowId: cow.cowId,
      averageMilk: (cow.milkAmount / cow.count).toFixed(2)
    }));
  };

  const handleResolveAlert = async (alertId) => {
    try {
      await axios.put(`http://localhost:8000/api/alerts/${alertId}/resolve`);
      setAlerts(alerts.filter(alert => alert._id !== alertId));
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const chartData = processChartData();

  return (
    <div className="space-y-10">
      {/* Milking Data Chart Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-200">
        <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">Milking Data Overview</h2>
        
        {loading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cowId" label={{ value: 'Cow ID', position: 'insideBottom', dy: 10 }} />
                <YAxis label={{ value: 'Avg Milk (L)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="averageMilk" name="Avg Milk (L)" fill="#34D399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Health Alerts Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-red-200">
        <h2 className="text-3xl font-extrabold text-red-700 mb-6 text-center">Health Alerts</h2>
        
        {alerts.length === 0 ? (
          <p className="text-center text-gray-500">✅ No active alerts – all cows are healthy!</p>
        ) : (
          <div className="space-y-5">
            {alerts.map(alert => (
              <div
                key={alert._id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center border border-red-300 bg-red-50 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start">
                  <FiAlertTriangle className="text-red-600 mr-3 mt-1" size={26} />
                  <div>
                    <p className="font-semibold text-red-800">{alert.message}</p>
                    <p className="text-sm text-gray-700 mt-1">
                      {alert.milkAmount ? `Milk: ${alert.milkAmount}L` : 'No milk data'} | 
                      {alert.temperature ? ` Temp: ${alert.temperature}°C` : ' No temp data'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleResolveAlert(alert._id)}
                  className="mt-3 md:mt-0 px-4 py-2 bg-green-600 text-white text-sm rounded-md shadow hover:bg-green-700 transition"
                >
                  Resolve
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MilkingDataSection;
