import ClassroomCard from "./StudentClassroomCard";
import { HiOutlineViewGrid } from "react-icons/hi";
import {motion} from "framer-motion";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import StudentContext from "../../context/StudentContext";


const StudentClassrooms = () => {
    const {  handleComponentChange } = useContext(GlobalContext);
    const {getMyClassrooms} = useContext(StudentContext);
    const [classRooms, setClassRooms] = useState([]);

    useEffect(() => {
        handleGetAllClassrooms();
    }, []);

    const handleGetAllClassrooms = async () => {
        const response = await getMyClassrooms();
        if(response){
            setClassRooms(response);
        }
    }
  return (
    <>
    <div className="flex-1 px-2 sm:px-0">
            <div className="flex justify-between items-center">
              <motion.h3
              initial={{x: -50}}
              animate={{x: 0}}
              transition={{duration: 0.4}}
              className="text-3xl font-extralight text-white/50">
                My Classrooms
              </motion.h3>
              <div className="inline-flex items-center space-x-2">
                <motion.a
                  initial={{x: 100}}
                  animate={{x: 0}}
                  transition={{duration: 0.4}}
                  className="bg-gray-900 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                  href="#"
                >
                  <HiOutlineViewGrid className="h-6 w-6" />
                </motion.a>
              </div>
            </div>
            <motion.div
            initial={{y: 100}}
            animate={{y: 0.2}}
            className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

              {classRooms.map((classRoom, index) => (
                <ClassroomCard key={index} index={index} classRoom={classRoom} />
              ))}
            </motion.div>
          </div>
    </>
  )
}

export default StudentClassrooms