import React, { useState } from 'react';
import Cards from '../components/Home/Cards';
import { FaCirclePlus } from "react-icons/fa6";
import InputData from '../components/Home/InputData';

const AllTask = () => {
  const [input, setInput] = useState('hidden');

  return (
    <>
      <div> 
        <div className='w-full flex items-end text-3xl'>
          <button onClick={() => setInput('')} className='px-4 py-2'>
            <FaCirclePlus className='text-gray-400 hover:text-gray-100' />
          </button>
        </div>
        <Cards home="true" setInput={setInput} />
      </div>
      <InputData input={input} setInput={setInput} />
    </>
  );
};

export default AllTask;
