import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
<<<<<<< Updated upstream
import Login from "./pages/InventoryManager/Login/Login";
import GrassingSession from "./pages/InventoryManager/GrassingSession/GrassingSession.jsx";
import Grassing from "./pages/InventoryManager/Grassing/Grassing.jsx";
import Profile from "./pages/InventoryManager/Profile/Profile.jsx";
import UpdateProfile from "./pages/InventoryManager/Profile/UpdateProfile.jsx";
import GrassingSessionUpdate from "./pages/InventoryManager/GrassingSession/GrassingSessionUpdate.jsx";
import GrassingUpdate from "./pages/InventoryManager/Grassing/GrassingUpdate.jsx";
import AddGrassing from "./pages/InventoryManager/Grassing/AddGrassing.jsx";
import Alerts from "./components/Alerts";

=======
import milkingData from './pages/MilkingManagement/milkingData'
>>>>>>> Stashed changes



const App = () => {
  return (
 <div>
 
  <Routes>
    <Route path='/' element={<Home/>}/>
<<<<<<< Updated upstream
    <Route path='/loginInventory' element={<Login/>}/>
    <Route path='/grassingsession' element={<GrassingSession/>}/>
    <Route path='/grassing' element={<Grassing/>}/>
    <Route path='/inventory' element={<Profile/>}/>
    <Route path='/updateprofile' element={<UpdateProfile/>}/>
    <Route path='/grassingsessionupdate' element={<GrassingSessionUpdate/>}/>
    <Route path='/grassingupdate/:id' element={<GrassingUpdate/>}/>
    <Route path='/addgrass' element={<AddGrassing/>}/>
    <Route path='/alerts' element={<Alerts/>}/>
=======
    <Route path='/milkingData' element={<milkingData/>}/>
>>>>>>> Stashed changes
  </Routes>
 

 </div>
    
  );
};

export default App;
