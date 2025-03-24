import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Alerts from "./components/Alerts";



const App = () => {
  return (
 <div>
 
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/alerts' element={<Alerts/>}/>
  </Routes>
 

 </div>
    
  );
};

export default App;
