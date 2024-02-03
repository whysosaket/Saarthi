import { motion } from "framer-motion";
import CreateAssignmentForm from "./CreateAssignmentForm";
import AssignmentUploadForm from "./AssignmentUploadForm";

const CreateAssignmnet = () => {
  return (
    <>
      <div className="flex-1 px-2 sm:px-0 w-full">
        <div className="flex justify-between items-center">
          <motion.h3
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-extralight text-white/50"
          >
            Create Assignment
          </motion.h3>
        </div>
          <div className="flex justify-center">
            <div className="w-1/2">
                <CreateAssignmentForm />
            </div>
            <div className="w-1/2">
              <AssignmentUploadForm />
            </div>
          </div>
      </div>
    </>
  );
};

export default CreateAssignmnet;
