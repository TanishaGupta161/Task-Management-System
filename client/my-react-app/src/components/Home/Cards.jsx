import React from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";

const Cards = ({ home, setInput }) => {
  const data = [
    
   
  ];

  return (
    <div className='grid grid-cols-3 gap-4 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((items, i) => (
        <div 
          className='flex flex-col justify-between bg-gray-700 p-4 rounded-sm shadow-lg text-white' 
          key={i}
        >
          <div>
            <h1 className='text-xl font-semibold'>{items.title}</h1>
            <p className='my-4'>{items.description}</p>
          </div>
          <div className='mt-3 w-full flex items-center'>
            <button className={`${items.status === "Incomplete" ? "bg-red-400" : "bg-green-800"} p-2 rounded w-3/6`}>
              {items.status}
            </button>
            <div className='p-2 w-3/6 text-xl flex justify-around'>
              <button><CiHeart /></button>
              <button><FaEdit /></button>
              <button><MdDeleteOutline /></button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <button 
          className='flex flex-col justify-center items-center h-64 bg-gray-700 p-4 rounded-sm shadow-lg text-white hover:scale-105 transition-all duration-300'
          onClick={() => setInput('fixed')}
        > 
          <h2 className='text-2xl'>+ Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
