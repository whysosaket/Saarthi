import Mascot from "../assets/mascot.png";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MdSubject } from "react-icons/md";
import { FaChalkboardTeacher, FaCheckCircle } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";

import ClassroomContext from "../context/ClassroomContext";

const Join = () => {
  const location = useLocation();
  const [hasNoPath, setHasNoPath] = useState(true);
  const [classRoomID, setClassRoomID] = useState("");
  const [classRoom, setClassRoom] = useState({className: "", teacherId: {name: ""}, studentIds: [], subject: ""});
  const [isSuccess, setIsSuccess] = useState(false);

    const {getClassroomInfo, joinClassroom} = useContext(ClassroomContext);

  useEffect(() => {
    if (location.pathname === "/join" || location.pathname === "/join/") {
      setHasNoPath(true);
    } else {
      setHasNoPath(false);
    }

    if (location.pathname.split("/").length > 2) {
      setClassRoomID(location.pathname.split("/")[2]);
      handleGetClassroomInfo(location.pathname.split("/")[2]);
    }
  }, [location]);

    const handleGetClassroomInfo = async (id: string) => {
        const response = await getClassroomInfo(id);
        if (response) {
        setClassRoom(response);
        }
    };

    const handleJoinClassroom = async () => {
        const response = await joinClassroom(classRoomID);
        if(response){
            setIsSuccess(true);
        }
    }

  return (
    <div className="w-full ">
        <motion.h1
        initial={{opacity: 0,y: -100}}
        animate={{opacity: 1,y: 0}}
        transition={{duration: 1}}
        className="text-center font-semibold text-6xl mt-24">Welcome to 
        <span className="text-blue-500 ml-4 text-7xl">सaarthi</span>
        </motion.h1>
        <div className="flex justify-center items-center -mt-12">
      <div className="w-1/2 px-16">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1,x: 0 }}
          transition={{ duration: 1.4 }}
          className="bg-white/10 p-4 rounded-lg my-8"
        >
          <h1 className="text-center font-semibold text-4xl">
            <span className="text-blue-500">Join </span>
            Classroom
          </h1>
          <hr className="my-3" />
          {isSuccess ? <Success /> : <>
          {hasNoPath ? (
            <div className="flex flex-col space-y-4">
              <div>
                <label className="text-white my-2">Classroom Code</label>
                <input
                  type="text"
                  className="w-full p-2 bg-white/20 rounded-lg my-2"
                />
              </div>
              <div>
                <button className="w-full p-2 bg-blue-500 rounded-lg text-white">
                  Join
                </button>
              </div>
            </div>
          ) : <>

            <div className="w-full flex">
            <div className="w-1/2">
                <h1 className="font-semibold text-xl">{classRoom.className}</h1>
                <h1 className="font-semibold text-xl">
                    <FaChalkboardTeacher className="h-4 w-4 inline-block text-blue-400 mr-2" />
                    {classRoom.teacherId.name}
                </h1>

                <h1 className="font-semibold text-md">
                    <PiStudent className="h-4 w-4 inline-block text-blue-400 mr-2" />
                    {classRoom.studentIds.length} Students
                </h1>
                <h1 className="font-semibold text-md">
                    <MdSubject className="h-4 w-4 inline-block text-blue-400 mr-2" />
                    {classRoom.subject}
                </h1>
            </div>
            <div className="w-1/2 flex">
                <button onClick={handleJoinClassroom} className="w-full p-2 bg-blue-500 rounded-lg text-white my-auto hover:bg-blue-700 hover:shadow-xl">
                    Join
                </button>
            </div>
            </div>
          
          </>
        
        }
        </>}

        </motion.div>
      </div>
      <div className="w-1/2">
        <motion.img
          animate={["initial"]}
          variants={{
            initial: {
              y: [-20, 20],
              rotate: 0,
              transition: {
                delay: 0.8,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.2,
                repeatType: "reverse",
              },
            },
          }}
          src={Mascot}
          alt="mascot"
        />
      </div>
      </div>
    </div>
  );
};

const Success = ()=>{
    const navigate = useNavigate();

    const handleGoToClassroom = () => {
      navigate(`/`);
  }
    return (
        <motion.div
        initial={{opacity: 0.4,x: -20}}
        animate={{opacity: 1,x: 0}}
        transition={{duration: 0.5}}
        className="w-full flex flex-col justify-center items-center">
            <h1 className="text-2xl font-semibold text-white">

            <FaCheckCircle className="h-8 w-8 inline-block text-green-500 mr-2 my-4" />
            Joined Classroom Successfully
            </h1>
            <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.5, delay: 0.2}}
            onClick={handleGoToClassroom}
            className="bg-blue-500 p-2 rounded-lg font-semibold text-white ml-2 hover:bg-blue-700 hover:shadow-xl">
                Go Home
            </motion.button>
        </motion.div>
    )
}

export default Join;
