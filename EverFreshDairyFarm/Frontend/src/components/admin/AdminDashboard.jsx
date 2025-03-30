import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiDroplet, FiPackage, FiSettings, FiLogOut, FiBarChart2, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
/*import { adminFooter } from '../adminFooter'*/

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-green-700 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex flex-col items-center justify-center">
          <img 
            src="/images/logo.png" 
            alt="Ever Fresh Dairy Logo" 
            className={`${sidebarOpen ? 'w-32 h-32' : 'w-12 h-12'} mb-4  `}
          />
          
        </div>
        
        <nav className="flex-1 mt-6">
          <ul>
            <NavItem 
              icon={<FiHome size={20} />} 
              text="Dashboard" 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
              sidebarOpen={sidebarOpen}
            />
            <NavItem 
              icon={<FiDroplet size={20} />} 
              text="Milking Management" 
              active={activeTab === 'milking'} 
              onClick={() => setActiveTab('milking')}
              sidebarOpen={sidebarOpen}
            />
            <NavItem 
              icon={<FiPackage size={20} />} 
              text="Inventory Management" 
              active={activeTab === 'inventory'} 
              onClick={() => setActiveTab('inventory')}
              sidebarOpen={sidebarOpen}
            />
            <NavItem 
              icon={<FiUsers size={20} />} 
              text="Veterinary Management" 
              active={activeTab === 'users'} 
              onClick={() => setActiveTab('users')}
              sidebarOpen={sidebarOpen}
            />
            <NavItem 
              icon={<FiBarChart2 size={20} />} 
              text="Reports & Analytics" 
              active={activeTab === 'reports'} 
              onClick={() => setActiveTab('reports')}
              sidebarOpen={sidebarOpen}
            />
          </ul>
        </nav>
        
        <div className="p-4">
          <button 
            onClick={handleLogout}
            className={`flex items-center w-full p-2 rounded-lg hover:bg-green-700 ${!sidebarOpen && 'justify-center'}`}
          >
            <FiLogOut size={20} />
            {sidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 capitalize">
            {activeTab.replace('-', ' ')}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
              AD
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {activeTab === 'dashboard' && <DashboardOverview />}
          {activeTab === 'milking' && <MilkingDataSection />}
          {activeTab === 'inventory' && <InventorySection />}
          {activeTab === 'users' && <VeterinarySection />}
          {activeTab === 'reports' && <ReportsSection />}
        </main>

        {/* Footer matching home page */}
       <adminFooter/>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick, sidebarOpen }) => (
  <li className="mb-2">
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 rounded-lg transition-colors ${active ? 'bg-green-700' : 'hover:bg-green-700'} ${!sidebarOpen && 'justify-center'}`}
    >
      {icon}
      {sidebarOpen && <span className="ml-3">{text}</span>}
    </button>
  </li>
);

// Dashboard Overview Component
const DashboardOverview = () => {
  const [stats, setStats] = useState({
    milkingRecords: 0,
    inventoryItems: 0,
    users: 0,
    recentActivity: []
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      milkingRecords: 142,
      inventoryItems: 28,
      users: 15,
      recentActivity: [
        { id: 1, type: 'milking', action: 'New record added', time: '2 mins ago' },
        { id: 2, type: 'inventory', action: 'Milk stock updated', time: '15 mins ago' },
        { id: 3, type: 'user', action: 'New vet registered', time: '1 hour ago' },
        { id: 4, type: 'milking', action: 'Record updated', time: '2 hours ago' },
      ]
    });
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard 
          title="Milking Records" 
          value={stats.milkingRecords} 
          icon={<FiDroplet className="text-green-600" size={24} />} 
          trend="up"
        />
        <StatCard 
          title="Inventory Items" 
          value={stats.inventoryItems} 
          icon={<FiPackage className="text-green-600" size={24} />} 
          trend="stable"
        />
        <StatCard 
          title="Registered Users" 
          value={stats.users} 
          icon={<FiUsers className="text-green-600" size={24} />} 
          trend="up"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {stats.recentActivity.map(activity => (
            <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
              <div className={`p-2 rounded-lg mr-3 ${
                activity.type === 'milking' ? 'bg-green-100 text-green-800' :
                activity.type === 'inventory' ? 'bg-green-100 text-green-800' :
                'bg-green-100 text-green-800'
              }`}>
                {activity.type === 'milking' ? <FiDroplet size={18} /> :
                 activity.type === 'inventory' ? <FiPackage size={18} /> : <FiUsers size={18} />}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center hover:shadow-md transition-shadow">
    <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold text-green-800">{value}</p>
      <div className={`flex items-center mt-1 text-sm ${
        trend === 'up' ? 'text-green-600' : 
        trend === 'down' ? 'text-red-600' : 'text-gray-500'
      }`}>
        {trend === 'up' ? (
          <>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            12%
          </>
        ) : trend === 'down' ? (
          <>
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            5%
          </>
        ) : 'No change'}
      </div>
    </div>
  </div>
);

// Milking Data Section with Real API Integration
const MilkingDataSection = () => {
    const [milkingData, setMilkingData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
      cowId: '',
      date: '',
      amount: '',
      notes: ''
    });
  
    useEffect(() => {
      // Fetch milking data from API
      const fetchData = async () => {
        setIsLoading(true);
        try {
          // const response = await fetch('/api/milking');
          // const data = await response.json();
          
          // Mock data
          const mockData = [
            { id: '1', cowId: 'C001', date: '2023-05-15T08:30:00', amount: 12.5, notes: 'Morning milking' },
            { id: '2', cowId: 'C002', date: '2023-05-15T08:45:00', amount: 14.2, notes: 'Morning milking' },
            { id: '3', cowId: 'C001', date: '2023-05-15T16:30:00', amount: 10.8, notes: 'Evening milking' },
            { id: '4', cowId: 'C003', date: '2023-05-15T08:35:00', amount: 13.7, notes: 'Morning milking' },
          ];
          
          setMilkingData(mockData);
        } catch (error) {
          console.error('Error fetching milking data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchData();
    }, []);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // const response = await fetch('/api/milking', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        // const newRecord = await response.json();
        
        // Mock response
        const newRecord = { 
          id: String(milkingData.length + 1), 
          ...formData,
          date: new Date().toISOString()
        };
        
        setMilkingData(prev => [...prev, newRecord]);
        setShowAddForm(false);
        setFormData({ cowId: '', date: '', amount: '', notes: '' });
      } catch (error) {
        console.error('Error adding milking record:', error);
      }
    };
  
    const handleDelete = async (id) => {
      if (window.confirm('Are you sure you want to delete this record?')) {
        try {
          // await fetch(`/api/milking/${id}`, { method: 'DELETE' });
          setMilkingData(prev => prev.filter(record => record.id !== id));
        } catch (error) {
          console.error('Error deleting record:', error);
        }
      }
    };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Milking Management</h2>
      <p className="text-gray-600 mb-6">Track daily milk production and analyze trends.</p>
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Milking Records</h3>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
        >
          <FiPlus className="mr-2" /> Add Record
        </button>
      </div>
      
      {showAddForm && (
        <div className="bg-gray-50 rounded-lg shadow p-6 mb-6">
          <h4 className="text-lg font-medium mb-4">Add New Milking Record</h4>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cow ID</label>
                <input
                  type="text"
                  name="cowId"
                  value={formData.cowId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount of Milk (L)</label>
                <input
                  type="number"
                  step="0.1"
                  name="amountofMilk"
                  value={formData.amountofMilk}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Milk Yield (L/min)</label>
                <input
                  type="number"
                  step="0.01"
                  name="milkYield"
                  value={formData.milkYield}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quality Check</label>
                <select
                  name="qualityCheckResult"
                  value={formData.qualityCheckResult}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Notes</label>
              <textarea
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows="3"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Record'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cow ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (L)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yield</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {milkingData.map(record => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.cowId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.amountofMilk}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.duration} min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.milkYield} L/min</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.qualityCheckResult === 'pass' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.qualityCheckResult}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <FiEdit2 className="inline" />
                    </button>
                    <button 
                      onClick={() => handleDelete(record._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Inventory Section
const InventorySection = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Inventory Management</h2>
      <p className="text-gray-600 mb-6">Monitor feed, medicine, and farm supplies.</p>
      {/* Inventory management components would go here */}
    </div>
  );
};

// Veterinary Section
const VeterinarySection = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Veterinary Management</h2>
      <p className="text-gray-600 mb-6">Log medical check-ups and receive health alerts.</p>
      {/* Veterinary management components would go here */}
    </div>
  );
};

// Reports Section
const ReportsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Reports & Analytics</h2>
      <p className="text-gray-600 mb-6">View comprehensive reports and analytics.</p>
      {/* Reports components would go here */}
    </div>
  );
};

export default AdminDashboard;