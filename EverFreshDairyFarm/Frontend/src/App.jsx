import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from "./pages/InventoryManager/Login/Login";
import GrassingSession from "./pages/InventoryManager/GrassingSession/GrassingSession.jsx";
import Grassing from "./pages/InventoryManager/Grassing/Grassing.jsx";
import Profile from "./pages/InventoryManager/Profile/Profile.jsx";
import UpdateProfile from "./pages/InventoryManager/Profile/UpdateProfile.jsx";
import GrassingSessionUpdate from "./pages/InventoryManager/GrassingSession/GrassingSessionUpdate.jsx";
import GrassingUpdate from "./pages/InventoryManager/Grassing/GrassingUpdate.jsx";
import AddGrassing from "./pages/InventoryManager/Grassing/AddGrassing.jsx";
import Alerts from "./components/Alerts";

import MLogin from "./pages/MilkingManagement/MLogin/MLogin.jsx";
import MilkingData from "./pages/MilkingManagement/MilkingData/MilkingData.jsx";
import AddMilkingData from "./pages/MilkingManagement/MilkingData/AddMilkingData.jsx";
import MilkingUpdate from "./pages/MilkingManagement/MilkingData/MilkingUpdate.jsx";
import MilkingSession from "./pages/MilkingManagement/MilkingSession/MilkingSession.jsx";
import AddMikingSession from "./pages/MilkingManagement/MilkingSession/AddMilkingSession.jsx";
import UpdateMilkingSession from "./pages/MilkingManagement/MilkingSession/UpdateMilkingSession.jsx"

const App = () => {
  return (
 <div>
 
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/loginInventory' element={<Login/>}/>
    <Route path='/grassingsession' element={<GrassingSession/>}/>
    <Route path='/grassing' element={<Grassing/>}/>
    <Route path='/inventory' element={<Profile/>}/>
    <Route path='/updateprofile' element={<UpdateProfile/>}/>
    <Route path='/grassingsessionupdate/:id' element={<GrassingSessionUpdate/>}/>
    <Route path='/grassingupdate/:id' element={<GrassingUpdate/>}/>
    <Route path='/addgrass' element={<AddGrassing/>}/>
    <Route path='/alerts' element={<Alerts/>}/>

    <Route path='/loginMilking' element={<MLogin/>}/>
    <Route path='/milkingdata'  element={<MilkingData/>}/>
    <Route path='/addmilkingdata' element={<AddMilkingData/>}/>
    <Route path='/updatemilkingdata/:id' element={<MilkingUpdate/>}/>
    <Route path='/milkingsession' element={<MilkingSession/>}/>
    <Route path='/addmilkingsession'element={<AddMikingSession/>}/>
    <Route path='/milkingsessionupdate/:id'element={<UpdateMilkingSession/>}/>
  </Routes>
 

 </div>
    
  );
};

export default App;
