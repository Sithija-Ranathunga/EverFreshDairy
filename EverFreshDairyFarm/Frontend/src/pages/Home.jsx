import React from 'react'
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";



export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero Section with Slideshow */}
      <header className="text-center py-10 bg-white-700 text-white">
        <Carousel
          showArrows={true} 
          autoPlay={true} 
          infiniteLoop={true} 
          interval={3000} 
          showThumbs={false} 
          showStatus={false}
          className="mt-[-40px]"
        >
          
          <div>
            <img src="/images/farm1.jpg" alt="Farm Image 1" className="w-full h-[500px] object-cover" />
            <p className="legend text-lg">Welcome to Ever Fresh Dairy</p>
          </div>
          <div>
            <img src="/images/farm2.jpg" alt="Farm Image 2" className="w-full h-[500px] object-cover" />
            <p className="legend text-lg">Modern Farm Management</p>
          </div>
          <div>
            <img src="/images/farm3.jpg" alt="Farm Image 3" className="w-full h-[500px] object-cover" />
            <p className="legend text-lg">Healthy Cows, Better Milk</p>
          </div>
        </Carousel>
      </header>

      {/* Features Section */}
<section id="features" className="py-16 container mx-auto">
  <h3 className="text-3xl text-center font-bold text-gray-800">Features</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-6">
    
    {/* Milking Management */}
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <img src="/images/milking.jpg" alt="Milking Management" className="w-full h-50 object-cover rounded-md" />
      <h4 className="text-xl font-semibold mt-4">Milking Management</h4>
      <p className="mt-2 text-gray-600">Track daily milk production and analyze trends.</p>
    </div>

    {/* Inventory Management */}
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <img src="/images/inventory.jpg" alt="Inventory Management" className="w-full h-50 object-cover rounded-md" />
      <h4 className="text-xl font-semibold mt-4">Inventory Management</h4>
      <p className="mt-2 text-gray-600">Monitor feed, medicine, and farm supplies.</p>
    </div>

    {/* Veterinary Management */}
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <img src="/images/veterinary.jpg" alt="Veterinary Management" className="w-full h-50 object-cover rounded-md" />
      <h4 className="text-xl font-semibold mt-4">Veterinary Management</h4>
      <p className="mt-2 text-gray-600">Log medical check-ups and receive health alerts.</p>
    </div>

  </div>
</section>


      <Footer />
    </div>
  );
}