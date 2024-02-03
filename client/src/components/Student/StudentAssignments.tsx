import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import AssignmentCard from "./StudentAssignmentCard";
import StudentContext from "../../context/StudentContext";

const StudentAssignments = () => {

    const {getMyAssignments} = useContext(StudentContext);
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        handleGetAllClassrooms();
    }, []);

    const handleGetAllClassrooms = async () => {
        const response = await getMyAssignments();
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
            My Assignments
          </motion.h3>
        </div>
        <div className="flex-1 px-2 sm:px-0">
            <motion.div
            initial={{y: 100}}
            animate={{y: 0.2}}
            className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {assignments.map((assignment, index) => (
                <AssignmentCard key={index} index={index} assignment={assignment} />
              ))}
            </motion.div>
          </div>
      </div>
    </>
  );
};

export default StudentAssignments;
