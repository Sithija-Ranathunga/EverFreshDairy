import React from 'react'
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';



export default function Home() {
  return (
   
    <div className="min-h-screen bg-gray-100">
     <Header/> 
      
      {/* Hero Section */}
      <header className="text-center py-20 bg-blue-500 text-white">
        <h2 className="text-4xl font-bold">EVER FRESH DAIRY</h2>
        <p className="mt-4 text-lg">Automate and optimize your farm operations with our modern technology.</p>
        <a href="#features" className="mt-6 inline-block bg-white text-green-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200">
          Learn More
        </a>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 container mx-auto">
        <h3 className="text-3xl text-center font-bold text-gray-800">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">Milking Management</h4>
            <p className="mt-2 text-gray-600">Track daily milk production and analyze trends.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">Inventory Management</h4>
            <p className="mt-2 text-gray-600">Monitor feed, medicine, and farm supplies.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold">Veterinary Management</h4>
            <p className="mt-2 text-gray-600">Log medical check-ups and receive health alerts.</p>
          </div>
        </div>
      </section>

     <Footer/>
    </div>
    
  );
}
