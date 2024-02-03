import { motion } from "framer-motion";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdOutlineFeedback } from "react-icons/md";

const SubmitFeedback = (props: { assignmentId: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="w-4/5 bg-white/5 rounded-xl p-8 mx-auto my-6"
    >
      <div className="text-white text-2xl font-semibold">
        {/* {assignment.assignmentName} */} Send Feedback
      </div>
      <input type="text" className="w-full h-20 text-white bg-white/10 text-sm font-extralight my-3 p-4 rounded-lg " placeholder="Enter your feedback" />
      <div className="flex justify-start my-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex cursor-pointer">
        <MdOutlineFeedback className="mr-2 my-auto" size={20} />
          Send Feedback
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4 flex cursor-pointer">
          <FaWandMagicSparkles className="mr-2" size={20} />
          Send AI Feedback
        </button>
        </div>
    </motion.div>
  );
};

export default SubmitFeedback;
