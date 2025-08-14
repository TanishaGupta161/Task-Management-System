import React from 'react';
import { RxCross2 } from "react-icons/rx";

const InputData = ({ input, setInput }) => {
  return (
    <>
      <div 
        className={`${input} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`} 
        onClick={() => setInput('hidden')} 
      ></div>

      <div className={`${input} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className='w-3/6 bg-gray-900 p-4 rounded'>
          <div className='flex justify-end text-2xl'>
            <button className='bg-white' onClick={() => setInput('hidden')}>
              <RxCross2 />
            </button>
          </div>
          <input 
            type="text" 
            placeholder='Title' 
            className='bg-white text-black px-3 py-2 my-3 rounded w-full' 
          />
          <textarea 
            placeholder='Enter your task description here...'
            rows="17"
            className='bg-gray-700 text-white px-3 py-2 rounded w-full my-3'
          ></textarea>
          <button className='px-3 py-2 bg-blue-400 rounded text-white font-semibold'>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
