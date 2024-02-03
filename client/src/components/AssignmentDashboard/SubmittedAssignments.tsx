import AssignmentContext from "../../context/AssignmentContext";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

const SubmittedAssignments = (props: { assignmentID: string }) => {
  const { getSubmittedAssignments } = useContext(AssignmentContext);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);

  useEffect(() => {
    handleGetSubmittedAssignments();
  }, []);

  const handleGetSubmittedAssignments = async () => {
    let response = await getSubmittedAssignments(props.assignmentID);
    if (response) {
        setSubmittedAssignments(response);
    }
  };


  return (
    <motion.div
        initial={{ opacity: 0.0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
    className="w-full">
      <div className="bg-white/10 rounded-xl p-4">
        <h1 className="font-semibold text-2xl text-center">
          Submitted Assignments
        </h1>
        <hr className="my-2" />
        <div className="">
          <div className="bg-white/5 w-full p-4 flex justify-between rounded-lg">
            <span className="text-white/50 text-center">Student Name</span>
            <span className="text-white/50 text-center">Status</span>
            <span className="text-white/50 text-center">Submission Date</span>
          </div>
          {submittedAssignments.map((assignment: any, index: number) => (
            <motion.div
                initial={{ opacity: 0.0, x: 50 + index * 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              key={index}
              className="bg-white/10 w-full my-4 p-4 flex justify-between rounded-lg"
            >
              <span className="text-white/50 text-center">
                {assignment.name}
              </span>
              <span className="text-white/50 text-center">
                {assignment.submission.status}
              </span>
              <span className="text-white/50 text-center">
                {new Date(assignment.submission.submittedDate).toDateString()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SubmittedAssignments;
