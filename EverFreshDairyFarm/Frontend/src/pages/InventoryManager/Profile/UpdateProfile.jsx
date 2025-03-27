import React from 'react'
import { Header } from '../../../components/Header'
import { Footer } from '../../../components/Footer'
import InventorySideBar from '../../../components/InventorySideBar'

function UpdateProfile() {
  return (
    <div className="min-h-screen font-sans bg-gray-100">
    <Header/>
        <div className="flex">
          <InventorySideBar/>
          <div className="flex flex-col items-center w-full">
        <h1 className="my-6 text-3xl font-bold text-center">Profile</h1>

        <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-md">
          <form className="space-y-4 w-96">
            <div>
              <label className="block font-semibold">Name:  </label>
              
             
            </div>

            <div>
              <label className="block font-semibold">Email: </label>
              
            </div>

            <div>
              <label className="block font-semibold">NIC: </label>
              
            </div>

            <div>
              <label className="block font-semibold">Work Experince: </label>
              
            </div>

            <div className='flex gap-4'>
            <button
              type="submit"
              className="w-full py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
              onClick={() => navigate(`/grassingupdate/${Grass._id}`)}
            >
              Update
            </button>

            
            </div>
          </form>
        </div>
      </div>
        </div>
    <Footer/>
  </div>
  )
}

export default UpdateProfile