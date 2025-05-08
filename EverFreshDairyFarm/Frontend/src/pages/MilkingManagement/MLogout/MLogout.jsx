{/*import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../../Content/AppContent';
import axios from 'axios';
import { logout } from '../../../../../Backend/controllers/MilkingUser';

function MLogout () {

    const navigate = useNavigate();
    const { MLogout} = useContext(AppContent)

    const confirmMLogout = async () =>{
        try{
            axios.defaults.withCredentials = true
            const {data} = await axios.post('http://Localhost:8000/milkingManager/logout')
            logout();

            navigate('/loginMilking')
        } catch (error){
            TransformStream.error(error.message)
        }
    }

    const cancelMLogout = () => {
        navigate('milkingdata')
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
      
        
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 text-center bg-white shadow-xl rounded-2xl w-80">
            <h2 className="mb-4 text-lg font-semibold">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmMLogout}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelMLogout}
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

export default MLogout;*/}