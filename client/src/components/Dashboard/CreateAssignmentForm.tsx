import {
  MdOutlineDriveFileRenameOutline,
  MdClass,
  MdOutlineDescription,
  MdOutlineDateRange,
} from "react-icons/md";
import { motion } from "framer-motion";
import ClassroomContext from "../../context/ClassroomContext";
import AssignmentContext from "../../context/AssignmentContext";
import GlobalContext from "../../context/GlobalContext";
import { useContext, useEffect, useRef, useState } from "react";
import { MdAssignment } from "react-icons/md";

const CreateAssignmentForm = () => {
  const { handleComponentChange } = useContext(GlobalContext);
  const { getAllClassrooms, toastMessage } = useContext(ClassroomContext);
  const { createAssignment, questionLink, answerLink } = useContext(AssignmentContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const classroomRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const [classRooms, setClassRooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(
    null
  );

  const handleCreateAssignment = async () => {
    console.log(classroomRef.current);
    const name: string = nameRef.current?.value || "";
    const classroom: any = selectedClassroom;
    const description: string = descriptionRef.current?.value || "";
    const dueDate: string = dueDateRef.current?.value || "";
    console.log(name, classroom, description, dueDate);
    if (name == "" || classroom == "" || description == "" || dueDate == "") {
      toastMessage("Please fill all the fields to continue.", "error");
      return;
    }

    if (questionLink == "" || answerLink == "") {
      toastMessage("Please upload question and answer files", "error");
      return;
    }

    // check if due date is in future
    const dueDateObj = new Date(dueDate);
    const currentDate = new Date();
    if (dueDateObj < currentDate) {
      toastMessage("Due date should be in future", "error");
      return;
    }

    console.log(name, classroom, description, dueDate, questionLink, answerLink);
    const response = await createAssignment(
      name,
      classroom,
      description,
      dueDate
    );
    if (response) {
      handleComponentChange("assignments");
    }
  };

  useEffect(() => {
    handleGetAllClassrooms();
  }, []);

  const handleGetAllClassrooms = async () => {
    const response = await getAllClassrooms();
    if (response) {
      setClassRooms(response);
    }
  };

  const handleClassroomChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedClassroom(event.target.value);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="px-8 md:p-8"
      >
        <>
          <div className="bg-gray-100 bg-opacity-10 rounded-xl py-12 px-4 lg:px-24">
            <div className="mt-6">
              <div className="relative">
                <input
                  className="appearance-none border pl-12 border-gray-100/20 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-3xl w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="text"
                  placeholder="Assignment Name"
                  ref={nameRef}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <MdOutlineDriveFileRenameOutline className="h-7 w-7 ml-3 text-gray-400 p-1" />
                </div>
              </div>
              <div className="relative mt-3">
                <select
                  value={selectedClassroom || ""}
                  onChange={handleClassroomChange}
                  className="appearance-none border pl-12 border-gray-100/20 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-3xl w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select Classroom
                  </option>
                  {classRooms.map((classroom: any) => (
                    <option
                      key={classroom.classRoomId}
                      value={classroom.classRoomId}
                    >
                      {classroom.className}
                    </option>
                  ))}
                </select>
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <MdClass className="h-7 w-7 ml-3 text-gray-400 p-1" />
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  className="appearance-none border pl-12 border-gray-100/20 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-3xl w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="text"
                  placeholder="Description"
                  ref={descriptionRef}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <MdOutlineDescription className="h-7 w-7 ml-3 text-gray-400 p-1" />
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  className="appearance-none border pr-2 pl-12 border-gray-100/20 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-3xl w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  type="date"
                  ref={dueDateRef}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  <MdOutlineDateRange className="h-7 w-7 ml-3 text-gray-400 p-1" />
                </div>
              </div>
              <div className="flex items-center justify-center mt-8">
                <button
                  onClick={handleCreateAssignment}
                  className="text-white py-2 px-4 rounded-3xl flex items-center cursor-pointer bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  <MdAssignment className="h-6 w-6 inline-block mr-2" />
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      </motion.div>
    </>
  );
};

export default CreateAssignmentForm;
