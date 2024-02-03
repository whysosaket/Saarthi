import {motion} from "framer-motion"
import GlobalContext from "../../context/GlobalContext";
import {useContext} from "react";

const ClassroomCard = (props: {index: number, classRoom: any}) => {
    const {handleComponentChange, setActiveClassroom} = useContext(GlobalContext);

    const handleClassroomClick = () => {
        setActiveClassroom(props.classRoom.classRoomId);
        handleComponentChange("classroom");
    }
  return (
    <>
      <motion.div
      onClick={handleClassroomClick}
      initial={{y: 100+props.index*50}}
      animate={{y: 0}}
      transition={{duration: 0.3+props.index/10}}
      className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
        <img
          className="w-20 h-20 object-cover object-center rounded-full"
          src="https://images.unsplash.com/photo-1533147670608-2a2f9775d3a4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
          alt="dancing"
        />
        <h4 className="text-white text-2xl font-bold capitalize text-center">
          {props.classRoom.className}
        </h4>
        <p className="text-white/50 font-semibold">{props.classRoom.studentIds.length} students</p>
        <p className="text-white/50">{props.classRoom.subject}</p>
        <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
          {props.classRoom.classRoomId}
          <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse" />
        </p>
      </motion.div>
    </>
  );
};

export default ClassroomCard;
