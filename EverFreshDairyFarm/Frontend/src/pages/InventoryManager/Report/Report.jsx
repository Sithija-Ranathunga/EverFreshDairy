import React from "react";
import { Header } from "../../../components/Header.jsx";
import { Footer } from "../../../components/Footer.jsx";
import Sessionreport from "./Sessionreport.jsx";
import InventorySideBar from "../../../components/InventorySideBar.jsx";
import Grassingreport from "./Grassingreport.jsx";
import { useReactToPrint } from "react-to-print";


function Report() {
 
  
  return (
    <div className="min-h-screen bg-sky-100">
      <Header />
      <div className="flex min-h-screen">
        <InventorySideBar />

        {/* Report Content */}
        <div className="w-full p-12">
          <Grassingreport />
          <Sessionreport />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Report;
