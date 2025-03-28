import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Login from "./pages/InventoryManager/Login/Login";
import GrassingSession from "./pages/InventoryManager/GrassingSession/GrassingSession.jsx";
import Grassing from "./pages/InventoryManager/Grassing/Grassing.jsx";
import Profile from "./pages/InventoryManager/Profile/Profile.jsx";

import GrassingSessionUpdate from "./pages/InventoryManager/GrassingSession/GrassingSessionUpdate.jsx";
import GrassingUpdate from "./pages/InventoryManager/Grassing/GrassingUpdate.jsx";
import AddGrassing from "./pages/InventoryManager/Grassing/AddGrassing.jsx";
import Alerts from "./components/Alerts";
import AddSession from "./pages/InventoryManager/GrassingSession/AddSession.jsx";
import Session from "./pages/InventoryManager/GrassingSession/GrassingSession.jsx";
import Logout from "./pages/InventoryManager/Logout/Logout.jsx";
import Report from "./pages/InventoryManager/Report/Report.jsx";


const App = () => {
  return (
 <div>
 
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/loginInventory' element={<Login/>}/>
    <Route path='/grassingsession' element={<GrassingSession/>}/>
    <Route path='/grassing' element={<Grassing/>}/>
    <Route path='/inventory' element={<Profile/>}/>
    
    <Route path='/grassingsessionupdate/:id' element={<GrassingSessionUpdate/>}/>
    <Route path='/grassingupdate/:id' element={<GrassingUpdate/>}/>
    <Route path='/addgrass' element={<AddGrassing/>}/>
    <Route path='/alerts' element={<Alerts/>}/>
    <Route path='/addsession' element={<AddSession/>}/>
    <Route path='/session' element={<Session/>}/>
    <Route path='/logout' element={<Logout/>}/>
    <Route path='/report' element={<Report/>}/>
    
  </Routes>
 

 </div>
    
  );
};

export default App;
