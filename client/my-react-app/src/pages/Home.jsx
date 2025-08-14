import React from 'react';
import Sidebar from '../components/Home/Sidebar';
import { Outlet, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex flex-col md:flex-row h-[98vh] gap-4 bg-gray-800'>
      
      {/* Sidebar */}
      <div className='w-full md:w-1/6 border-gray-500 border rounded p-4 flex flex-col justify-between text-sm md:text-base '>
        
        {/* Signup link */}
        <Link 
          to="/signup" 
          className="hidden md:block text-center mb-6 text-white bg-gray-600 p-2 rounded hover:bg-gray-700"
        >
          SignUp
        </Link>
         

        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='w-full md:w-5/6 border-gray-500 border rounded p-4'>
        <Outlet />
      </div>
      
    </div>
  );
};

export default Home;
