import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AssignmentContext from "../context/AssignmentContext";
import SubmittedAssignmentInfo from "../components/AssignmentReport/SubmittedAssignmentInfo";
import Feedbacks from "../components/AssignmentReport/Feedbacks";
import SubmitFeedback from "../components/AssignmentReport/SubmitFeedback";
import {motion} from "framer-motion";


const AssignmentReport = () => {
  const location = useLocation();
    let assignmentID = location.pathname.split("/")[2];

    const {getSubmittedAssignmentReport} = useContext(AssignmentContext);
    const [feedbacks, setFeedbacks] = useState([]);
    const [response, setResponse] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        handleGetSubmittedAssignmentReport();
    }, []);

    const handleGetSubmittedAssignmentReport = async () => {
        const response = await getSubmittedAssignmentReport(assignmentID);
        if(response){
            setFeedbacks(response.submittedAssignment.feedback);
            console.log(response); 
            setResponse(response);
            setIsLoaded(true);
        }
    }
    

  return (
    <>
    {isLoaded ?
    <div className="my-8 h-screen w-full">
      <motion.h1
      initial={{y: -100}}
        animate={{y: 0}}
        transition={{duration: 0.7}}
      className="text-center font-semibold text-4xl my-4">
        Assignment
        <span className="text-blue-500 ml-2">Report</span>
      </motion.h1>
    <div className="w-full flex justify-center my-8">
        <div className="w-1/2">
            <SubmittedAssignmentInfo a={response} />
        </div>
        <div className="w-1/2">
            <Feedbacks feedbacks={feedbacks} />
            <SubmitFeedback assignmentId={assignmentID} />
        </div>
    </div>

    </div>: <div className="h-screen w-full flex justify-center items-center"></div>}
    </>
  );
};

export default AssignmentReport;
