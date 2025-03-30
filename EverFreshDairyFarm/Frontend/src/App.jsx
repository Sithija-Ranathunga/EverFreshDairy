import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/InventoryManager/Login/Login";
import GrassingSession from "./pages/InventoryManager/GrassingSession/GrassingSession.jsx";
import Grassing from "./pages/InventoryManager/Grassing/Grassing.jsx";
import Profile from "./pages/InventoryManager/Profile/Profile.jsx";

import GrassingSessionUpdate from "./pages/InventoryManager/GrassingSession/GrassingSessionUpdate.jsx";
import GrassingUpdate from "./pages/InventoryManager/Grassing/GrassingUpdate.jsx";
import AddGrassing from "./pages/InventoryManager/Grassing/AddGrassing.jsx";
import Alerts from "./components/Alerts";
/*import AddSession from "./pages/InventoryManager/GrassingSession/AddSession.jsx";
import Session from "./pages/InventoryManager/GrassingSession/GrassingSession.jsx";
import Logout from "./pages/InventoryManager/Logout/Logout.jsx";
import Report from "./pages/InventoryManager/Report/Report.jsx";*/
import VetLogin from "./pages/VetSurgeon/VetLogin/VetLogin.jsx";
import VetRegistry from "./pages/VetSurgeon/Registry/registry.jsx";
import AddVetRegistry from "./pages/VetSurgeon/Registry/Addregistry.jsx";
import UpdateVetRegistry from "./pages/VetSurgeon/Registry/UpdateRegistry.jsx";
import AddCheckups from "./pages/VetSurgeon/Checkups/AddCheckups.jsx";
import Checkups from "./pages/VetSurgeon/Checkups/Checkups.jsx";
import UpdateCheckups from "./pages/VetSurgeon/Checkups/UpdateCheckups.jsx";

import VetLogout from  "./pages/VetSurgeon/Vetlogout/Vetlogout.jsx";
import VetReport from  "./pages/VetSurgeon/Vetreport/Vetreport.jsx";
import VetProfile from "./pages/VetSurgeon/VetProfile/Vetprofile.jsx";
//import UpdateVetProfile from "./pages/VetSurgeon/VetProfile/UpdateVetProfile.jsx";

/*import VetProfile from "./pages/VetSurgeon/VetProfile/VetProfile.jsx";
import UpdateVetProfile from "./pages/VetSurgeon/VetProfile/UpdateVetProfile.jsx";*/
import Logout from "./pages/InventoryManager/Logout/Logout.jsx";
import MLogin from "./pages/MilkingManagement/MLogin/MLogin.jsx";
import MilkingData from "./pages/MilkingManagement/MilkingData/MilkingData.jsx";
import AddMilkingData from "./pages/MilkingManagement/MilkingData/AddMilkingData.jsx";
import MilkingUpdate from "./pages/MilkingManagement/MilkingData/MilkingUpdate.jsx";
import MilkingSession from "./pages/MilkingManagement/MilkingSession/MilkingSession.jsx";
import AddMikingSession from "./pages/MilkingManagement/MilkingSession/AddMilkingSession.jsx";
import UpdateMilkingSession from "./pages/MilkingManagement/MilkingSession/UpdateMilkingSession.jsx";
import MilkingReport from "./pages/MilkingManagement/Report/MilkingReport.jsx";
import MProfile  from "./pages/MilkingManagement/MProfile/MProfile.jsx";



const App = () => {
  return (
 <div>
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginInventory" element={<Login />} />
        <Route path="/grassingsession" element={<GrassingSession />} />
        <Route path="/grassing" element={<Grassing />} />
        <Route path="/inventory" element={<Profile />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/grassingsessionupdate" element={<GrassingSessionUpdate />} />
        <Route path="/grassingupdate/:id" element={<GrassingUpdate />} />
        <Route path="/addgrass" element={<AddGrassing />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/VetLogin" element={<VetLogin />} />
        <Route path="/Registry" element={<VetRegistry />} />
        <Route path="/Addregistry" element={<AddVetRegistry />} />
        <Route path="/UpdateRegistry/:id" element={<UpdateVetRegistry />} />
        <Route path="/AddCheckups" element={<AddCheckups />} />
        <Route path="/Checkups" element={<Checkups />} />
        <Route path="/updatechekups/:id" element={<UpdateCheckups />} />
        <Route path="/Logout" element={<VetLogout />} />
        <Route path="/Vetreport" element={<VetReport />} />
        <Route path="/Vetprofile" element={<VetProfile />} />

        <Route path='/loginMilking' element={<MLogin/>}/>
    <Route path='/milkingdata'  element={<MilkingData/>}/>
    <Route path='/addmilkingdata' element={<AddMilkingData/>}/>
    <Route path='/updatemilkingdata/:id' element={<MilkingUpdate/>}/>
    <Route path='/milkingsession' element={<MilkingSession/>}/>
    <Route path='/addmilkingsession'element={<AddMikingSession/>}/>
    <Route path='/milkingsessionupdate/:id'element={<UpdateMilkingSession/>}/>
    <Route path='/milkingreport'element={<MilkingReport/>}/>
    <Route path='/milkingprofile'element={<MProfile/>}/>
       
      </Routes>
 
  
 

 </div>
    
  )}
  export default App;
