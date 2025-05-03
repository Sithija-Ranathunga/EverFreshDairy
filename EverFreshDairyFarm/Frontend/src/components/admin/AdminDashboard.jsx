import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUsers, FiDroplet, FiPackage, FiSettings, FiLogOut, FiBarChart2, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import MilkingDataSection from "./MilkingDataSection";

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
            className={`${sidebarOpen ? 'w-32 h-32' : 'w-12 h-12'} mb-4`}
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

        <footer className="p-4 text-center text-gray-500">
          © 2025 EverFresh Dairy. All rights reserved.
        </footer>
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

// Dashboard Overview Component (merged version)
const DashboardOverview = () => {
  const [stats, setStats] = useState({
    milkingRecords: 0,
    inventoryItems: 0,
    users: 0,
    totalCows: 120,
    recentActivity: []
  });

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      milkingRecords: 142,
      inventoryItems: 28,
      users: 15,
      totalCows: 120,
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Cows" 
          value={stats.totalCows} 
          icon={<FiUsers className="text-green-600" size={24} />} 
          trend="stable"
        />
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
          title="Active Alerts" 
          value={3} 
          icon={<FiSettings className="text-green-600" size={24} />} 
          trend="down"
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