import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import AssignmentContext from "../../context/AssignmentContext";
import GlobalContext from "../../context/GlobalContext";
import AssignmentCard from "./AssignmentCard";


const Assignments = () => {

    const {handleComponentChange} = useContext(GlobalContext);
    const {getAllAssignments} = useContext(AssignmentContext);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        handleGetAllClassrooms();
    }, []);

    const handleGetAllClassrooms = async () => {
        const response = await getAllAssignments();
        if(response){
            setAssignments(response);
        }
    }

  return (
    <>
      <div className="flex-1 px-2 sm:px-0">
        <div className="flex justify-between items-center">
          <motion.h3
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-extralight text-white/50 w-full"
          >
            Assignments
          </motion.h3>
        </div>
        <div className="flex-1 px-2 sm:px-0">
            <motion.div
            initial={{y: 100}}
            animate={{y: 0.2}}
            className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div className="group bg-gray-600/10 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
                <button
                onClick={() => handleComponentChange("createAssignments")}
                  className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
                >
                  <GoPlus className="h-10 w-10" />
                </button>
                <a
                  className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center"
                  href="#"
                >
                  Create Assignment
                </a>
              </div>

              {assignments.map((assignment, index) => (
                <AssignmentCard key={index} index={index} assignment={assignment} />
              ))}
            </motion.div>
          </div>
      </div>
    </>
  );
};

export default Assignments;
