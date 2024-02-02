import { motion } from "framer-motion";

const Assignments = () => {
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
          Assignments
      </div>
    </>
  );
};

export default Assignments;
