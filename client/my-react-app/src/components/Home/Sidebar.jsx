import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const data = [
    { title: "All Task", icon: <CgNotes />, link: "/home" },
    { title: "Important Task", icon: <MdLabelImportantOutline />, link: "/home/important-task" },
    { title: "Completed Task", icon: <FaCheckDouble />, link: "/home/completed-task" },
    { title: "InCompleted Task", icon: <TbNotebookOff />, link: "/home/incompleted-task" }
  ];

  return (
    <>
      <div>
        <h2 className='my-1 text-lg md:text-xl font-semibold text-white'>UserName</h2>
        <h4 className='my-1 text-gray-400 text-xs md:text-sm'>user@gmail.com</h4>
        <hr />
      </div>

      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all
                       text-gray-300 text-xs md:text-sm lg:text-base hover:text-white"
          >
            <span className="text-lg md:text-xl">{items.icon}</span>
            <span className="ml-1">{items.title}</span>
          </Link>
        ))}
      </div>

      <div>
        <button
          onClick={() => navigate("/login")}
          className='bg-gray-600 w-full p-2 rounded text-xs md:text-sm hover:bg-gray-400 text-white lg:text-base'
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;

