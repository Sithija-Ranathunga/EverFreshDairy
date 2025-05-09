import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { FiAlertTriangle, FiHome, FiBarChart2, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [milkingData, setMilkingData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('milkingtoken');
        const [milkingResponse, alertsResponse] = await Promise.all([
          axios.get('http://localhost:8000/milkingData', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }),
          axios.get('http://localhost:8000/alerts', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
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
      const token = localStorage.getItem('milkingtoken');
      await axios.put(`http://localhost:8000/alerts/${alertId}/resolve`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAlerts(alerts.filter(alert => alert._id !== alertId));
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('milkingtoken');
    localStorage.removeItem('adminData');
    navigate('/admin-login');
  };

  const chartData = processChartData();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-green-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-green-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
              <span className="text-xl font-bold">EverFresh Dairy</span>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-full hover:bg-green-700"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center p-3 rounded-lg hover:bg-green-700">
            <FiHome className="text-xl" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </Link>
          <Link to="/admin/milking" className="flex items-center p-3 rounded-lg hover:bg-green-700">
            <FiBarChart2 className="text-xl" />
            {sidebarOpen && <span className="ml-3">Milking Data</span>}
          </Link>
          <Link to="/admin/users" className="flex items-center p-3 rounded-lg hover:bg-green-700">
            <FiUsers className="text-xl" />
            {sidebarOpen && <span className="ml-3">User Management</span>}
          </Link>
          <Link to="/admin/settings" className="flex items-center p-3 rounded-lg hover:bg-green-700">
            <FiSettings className="text-xl" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </Link>
        </nav>

        <div className="p-4 border-t border-green-700">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-green-700"
          >
            <FiLogOut className="text-xl" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-800 font-semibold">A</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-500">Total Cows</h3>
              <p className="text-3xl font-bold text-green-600">142</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-500">Active Alerts</h3>
              <p className="text-3xl font-bold text-red-600">{alerts.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-500">Avg. Milk Production</h3>
              <p className="text-3xl font-bold text-blue-600">
                {chartData.length > 0 
                  ? (chartData.reduce((sum, cow) => sum + parseFloat(cow.averageMilk), 0) / chartData.length).toFixed(2) + 'L'
                  : '0L'}
              </p>
            </div>
          </div>

          {/* Milking Data Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Milking Data Overview</h2>
              
              {loading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="cowId" />
                      <YAxis label={{ value: 'Liters', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="averageMilk" name="Average Milk (L)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Alerts Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-800">Health Alerts</h2>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {alerts.length} Active
                </span>
              </div>
              
              {alerts.length === 0 ? (
                <p className="text-gray-600">No active alerts</p>
              ) : (
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div key={alert._id} className="p-4 border border-red-200 rounded-lg bg-red-50 flex justify-between items-center">
                      <div className="flex items-center">
                        <FiAlertTriangle className="text-red-600 mr-3" size={24} />
                        <div>
                          <p className="font-semibold">{alert.message}</p>
                          <p className="text-sm text-gray-600">
                            {alert.cowId && `Cow ID: ${alert.cowId}`}
                            {alert.milkAmount && ` | Milk: ${alert.milkAmount}L`}
                            {alert.temperature && ` | Temp: ${alert.temperature}°C`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleResolveAlert(alert._id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                      >
                        Resolve
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;