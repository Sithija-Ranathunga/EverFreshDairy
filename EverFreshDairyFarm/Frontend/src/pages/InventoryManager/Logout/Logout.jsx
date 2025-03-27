import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../../Content/AppContent';
import axios from 'axios';

function Logout() {
  const navigate = useNavigate();
  const { setUserData, setIsLoggedin} = useContext(AppContent)

  const confirmLogout = async ()=>{
    try{
        axios.defaults.withCredentials = true
        const {data} = await axios.post('http://Localhost:8000/inventoryManager/logout')
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/loginInventory')
    }catch(error){
       toast.error(error.message)
    }
  }

  

  const cancelLogout = () => {
    navigate('/grassing')
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      
        
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white shadow-xl rounded-2xl w-80">
            <h2 className="mb-4 text-lg font-semibold">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-black bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
     
    </div>
  );
}

export default Logout;
