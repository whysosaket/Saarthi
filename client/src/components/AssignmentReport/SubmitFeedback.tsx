import { motion } from "framer-motion";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { MdOutlineFeedback } from "react-icons/md";
import AssignmentContext from "../../context/AssignmentContext";
import { useContext, useRef } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

const SubmitFeedback = (props: { assignmentId: string, setCounter: any, answerID: any }) => {
  const { sendFeedback, getAIfeedback } = useContext(AssignmentContext);
  const feedbackRef = useRef<HTMLInputElement>(null);

  const handleSendFeedback = async () => {
    const feedback = feedbackRef.current?.value || "";
    if (feedback === "") {
      return;
    }
    const response = await sendFeedback(props.assignmentId, feedback);
    if (response) {
      props.setCounter((prev: number) => prev + 1);
      feedbackRef.current!.value = "";
    }
  }

  const handleSendAIFeedback = async () => {
    console.log(props.answerID);
    const answer = await getDownloadURL(ref(storage, props.answerID));
    const response = await getAIfeedback(props.assignmentId, answer);
    if (response) {
      props.setCounter((prev: number) => prev + 1);
    }
  }

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
      <input ref={feedbackRef} type="text" className="w-full text-white border border-gray-100/50 bg-white/10 text-sm font-extralight my-3 py-2 px-4 rounded-3xl " placeholder="Enter your feedback" />
      <div className="flex justify-center md:justify-start my-4">
      <button onClick={handleSendFeedback} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl flex items-center cursor-pointer">
        <MdOutlineFeedback className="mr-2 my-auto" size={20} />
          Send
        </button>
        <button
        onClick={handleSendAIFeedback}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl ml-4 flex items-center cursor-pointer">
          <FaWandMagicSparkles className="mr-2" size={20} />
          AI
        </button>
        </div>
    </motion.div>
  );
};

export default SubmitFeedback;
