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
      <header className="py-10 text-center text-white bg-white-700">
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
            <p className="text-lg legend">Welcome to Ever Fresh Dairy</p>
          </div>
          <div>
            <img src="/images/farm2.jpg" alt="Farm Image 2" className="w-full h-[500px] object-cover" />
            <p className="text-lg legend">Modern Farm Management</p>
          </div>
          <div>
            <img src="/images/farm3.jpg" alt="Farm Image 3" className="w-full h-[500px] object-cover" />
            <p className="text-lg legend">Healthy Cows, Better Milk</p>
          </div>
        </Carousel>
      </header>

      {/* Features Section */}
<section id="features" className="container py-16 mx-auto">
  <h3 className="text-3xl font-bold text-center text-gray-800">Features</h3>
  <div className="grid grid-cols-1 gap-8 px-6 mt-8 md:grid-cols-3">
    
    {/* Milking Management */}
    <div className="p-6 text-center bg-white rounded-lg shadow-md">
      <img src="/images/milking.jpg" alt="Milking Management" className="object-cover w-full rounded-md h-50" />
      <h4 className="mt-4 text-xl font-semibold">Milking Management</h4>
      <p className="mt-2 text-gray-600">Track daily milk production and analyze trends.</p>
    </div>

    {/* Inventory Management */}
    <div className="p-6 text-center bg-white rounded-lg shadow-md">
      <img src="/images/inventory.jpg" alt="Inventory Management" className="object-cover w-full rounded-md h-50" />
      <h4 className="mt-4 text-xl font-semibold">Inventory Management</h4>
      <p className="mt-2 text-gray-600">Monitor feed, medicine, and farm supplies.</p>
    </div>

    {/* Veterinary Management */}
    <div className="p-6 text-center bg-white rounded-lg shadow-md">
      <img src="/images/veterinary.jpg" alt="Veterinary Management" className="object-cover w-full rounded-md h-50" />
      <h4 className="mt-4 text-xl font-semibold">Veterinary Management</h4>
      <p className="mt-2 text-gray-600">Log medical check-ups and receive health alerts.</p>
    </div>

  </div>
</section>


      <Footer />
    </div>
  );
}
