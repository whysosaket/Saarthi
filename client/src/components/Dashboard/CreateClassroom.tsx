import { motion } from "framer-motion";
import CreateClassroomForm from "./CreateClassroomForm";

const CreateClassroom = () => {
  return (
    <>
      <div className="flex-1 px-2 sm:px-0 w-full">
        <div className="flex justify-between items-center">
          <motion.h3
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl ml-8 font-extralight text-white/50"
          >
            Create Classroom
          </motion.h3>
        </div>
          <div className="">
            <div>
                <CreateClassroomForm />
            </div>
          </div>
      </div>
    </>
  );
};

export default CreateClassroom;
