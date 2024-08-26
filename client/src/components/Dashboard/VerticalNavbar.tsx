import { BsPeopleFill } from "react-icons/bs";
import { IoLogOutOutline } from "react-icons/io5";
import { MdAssignment} from "react-icons/md";
import GlobalContext from "../../context/GlobalContext";
import { useContext } from "react";
import { PiStudent } from "react-icons/pi";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VerticalNavbar = () => {
  const { handleComponentChange } = useContext(GlobalContext);
  const handleLogout = ()=>{
    localStorage.removeItem("auth-token");
    window.location.href="/";
  }

  return (
    <motion.div
      initial={{ scale: 0.6, x: -100 }}
      animate={{ scale: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between"
    >
      <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
        {/* Active: bg-gray-800 text-white, Not active: text-white/50 */}
        <motion.button
          initial={{ scale: 0.6, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gray-800 text-white p-4 inline-flex justify-center rounded-md"
          onClick={() => handleComponentChange("classrooms")}
        >
          <BsPeopleFill className="lg:h-6 lg:w-6 sm:h-8 sm:w-8" />
        </motion.button>
        <motion.button
          initial={{ scale: 0.6, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
          onClick={() => handleComponentChange("assignments")}
        >
          <MdAssignment className="lg:h-6 lg:w-6 sm:h-8 sm:w-8" />
        </motion.button>
      </nav>
      <div className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
        <Link to="/studentdashboard">
        <motion.button
          initial={{ scale: 0.6, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
        >
            <PiStudent className="lg:h-6 lg:w-6 sm:h-8 sm:w-8" />
        </motion.button>
        </Link>
        <motion.button
          onClick={handleLogout}
          initial={{ scale: 0.6, rotate: 90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover"
        >
          <IoLogOutOutline className="lg:h-6 lg:w-6 sm:h-8 sm:w-8" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VerticalNavbar;
