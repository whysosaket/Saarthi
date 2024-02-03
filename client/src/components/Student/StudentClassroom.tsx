import { motion } from "framer-motion";
import ClassroomInfo from "./StudentClassroomInfo";
import GlobalContext from "../../context/GlobalContext";
import ClassroomContext from "../../context/ClassroomContext";
import { useContext, useEffect, useState } from "react";
import ClassroomAssignments from "./StudentClassroomAssignments";
import StudentNotices from "./StudentNotices";

// const clientUrl = import.meta.env.VITE_CLIENT_URL;

const Classroom = () => {
  const { activeClassroom, handleComponentChange} = useContext(GlobalContext);
  const { getClassroomInfo, deleteClassroom } = useContext(ClassroomContext);

  const [showModal, setShowModal] = useState(false);

  const [classroomInfo, setClassroomInfo] = useState({
    className: "",
    subject: "",
    classRoomId: "",
    description: "",
    studentIds: [],
    teacherId: { name: "", email: "" },
  });

  useEffect(() => {
    handleGetClassroomInfo();
  }, []);

  const handleGetClassroomInfo = async () => {
    const response = await getClassroomInfo(activeClassroom);
    if (response) {
      setClassroomInfo(response);
    }
  };


  const handleDeleteClassroom = async () => {
    const response = await deleteClassroom(activeClassroom);
    if (response) {
        setShowModal(false);
        handleComponentChange("classrooms");
    }
  }

  return (
    <>
    {showModal && <DeleteModal
        handleDeleteClassroom={handleDeleteClassroom}
        setShowModal={setShowModal}
    />}
    <div className="flex-1 px-2 sm:px-0 w-full">
      <div className="flex justify-between items-center">
        <motion.h3
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-extralight text-white/50"
        >
          Classroom Info
        </motion.h3>
      </div>
      <div className="flex justify-center my-4">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-1/2"
        >
          <ClassroomInfo classroomInfo={classroomInfo} />
        </motion.div>
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-1/2"
        >
          {/* <Students
            students={classroomInfo.studentIds}
            classroomID={activeClassroom}
          /> */}
          <ClassroomAssignments classroomID={activeClassroom} />
        </motion.div>
      </div>
      <StudentNotices classroomID={activeClassroom} />
    </div>
    </>
  );
};

const DeleteModal = (props: {handleDeleteClassroom: any, setShowModal: any}) => {
  return (
    <div className="bg-black/30 backdrop-blur-md h-screen w-full top-0 left-0 z-50 absolute flex justify-center">
      <div className="rounded-lg bg-white/20 p-8 shadow-2xl m-auto w-1/3">
        <h2 className="text-lg font-bold">Are you sure you want to do that?</h2>
        <p className="mt-2 text-sm text-gray-200">
          You are going to delete this classroom, are you 100% sure?
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={props.handleDeleteClassroom}
            type="button"
            className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-red-600"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => props.setShowModal(false)}
            type="button"
            className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600"
          >
            No, go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
