import React from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import {Link}  from 'react-router-dom'
const Sidebar = () => {

    const data=[
        {
            title:"All Task",
            icon:<CgNotes />,
            link:"/",
        },
        {
            title:"Important Task",
            icon:<MdLabelImportantOutline />,
            link:"/importantTask",
        },
        {
            title:"Completed Task",
            icon:<FaCheckDouble />,
            link:"/completedTask",
        },
        {
            title:"InCompleted Task",
            icon:<TbNotebookOff />,
            link:"/inCompletedTask"
        },
    ]

  return (
    <>
        <div >
            <h2 className='my-1 text-xl font-semibold'>UserName </h2>
            <h4 className='my-1 text-gray-400'>user@gmail.com</h4>
            <hr />
        </div>
        <div>
            {data.map(
                (items,i)=>(
                    <Link
                    to={items.link}
                    key={i}
                     className="my-2 flex items-center gap-3 hover:bg-gray-600 p-2 rounded transition-all"
                   >
                    {items.icon}&nbsp; {items.title}
                  
                    </Link>
                ))}
           
        </div>
        <div>
           <button className='bg-gray-600 w-full p-2 rounded' >Log Out</button>
        </div>
    </>
  )
}

export default Sidebar