import { motion } from "framer-motion";
import { MdOutlineFeedback } from "react-icons/md";
import AssignmentContext from "../../context/AssignmentContext";
import { useContext, useRef } from "react";

const RaiseDispute = (props: { assignmentId: string, setCounter: any }) => {
  const {  raiseDispute } = useContext(AssignmentContext);
  const feedbackRef = useRef<HTMLInputElement>(null);

  const handleSendFeedback = async () => {
    const feedback = feedbackRef.current?.value || "";
    if (feedback === "") {
      return;
    }
    const response = await raiseDispute(props.assignmentId, feedback);
    if (response) {
      props.setCounter((prev: number) => prev + 1);
      feedbackRef.current!.value = "";
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
        Raise Dispute
      </div>
      <input ref={feedbackRef} type="text" className="w-full text-white bg-white/10 text-sm font-extralight my-3 p-4 rounded-lg " placeholder="Write you dispute message here" />
      <div className="flex justify-start">
      <button onClick={handleSendFeedback} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer">
        <MdOutlineFeedback className="mr-2 my-auto" size={20} />
          <span className="my-auto">Send</span>
        </button>
        </div>
    </motion.div>
  );
};

export default RaiseDispute;
