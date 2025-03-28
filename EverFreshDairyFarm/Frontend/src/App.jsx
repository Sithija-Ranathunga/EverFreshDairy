import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/InventoryManager/Login/Login";
import GrassingSession from "./pages/InventoryManager/GrassingSession/GrassingSession.jsx";
import Grassing from "./pages/InventoryManager/Grassing/Grassing.jsx";
import Profile from "./pages/InventoryManager/Profile/Profile.jsx";
import UpdateProfile from "./pages/InventoryManager/Profile/UpdateProfile.jsx";
import GrassingSessionUpdate from "./pages/InventoryManager/GrassingSession/GrassingSessionUpdate.jsx";
import GrassingUpdate from "./pages/InventoryManager/Grassing/GrassingUpdate.jsx";
import AddGrassing from "./pages/InventoryManager/Grassing/AddGrassing.jsx";
import Alerts from "./components/Alerts";
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

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginInventory" element={<Login />} />
        <Route path="/grassingsession" element={<GrassingSession />} />
        <Route path="/grassing" element={<Grassing />} />
        <Route path="/inventory" element={<Profile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
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
       
      </Routes>
    </div>
  );
};

export default App;
