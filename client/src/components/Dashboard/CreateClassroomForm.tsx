import {
  MdOutlineDriveFileRenameOutline,
  MdSubject,
  MdOutlineDescription,
} from "react-icons/md";
import { motion } from "framer-motion";

const CreateClassroomForm = () => {
  return (
    <>
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="p-8 w-1/2"
      >
        <div className="bg-gray-100 bg-opacity-10 rounded-xl py-12 px-4 lg:px-24">
          <div className="mt-6">
            <div className="relative">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-md w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type="text"
                placeholder="Classroom Name"
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <MdOutlineDriveFileRenameOutline className="h-7 w-7 ml-3 text-gray-400 p-1" />
              </div>
            </div>
            <div className="relative mt-3">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-200 focus:shadow-outline"
                type="text"
                placeholder="Subject"
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <MdSubject className="h-7 w-7 ml-3 text-gray-400 p-1" />
              </div>
            </div>
            <div className="relative mt-3">
              <input
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-md w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                type="text"
                placeholder="Description"
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <MdOutlineDescription className="h-7 w-7 ml-3 text-gray-400 p-1" />
              </div>
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="text-white py-2 px-4 rounded-xl rounded bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Create Classroom
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default CreateClassroomForm;
