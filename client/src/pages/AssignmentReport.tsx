import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AssignmentContext from "../context/AssignmentContext";
import StudentContext from "../context/StudentContext";
import SubmittedAssignmentInfo from "../components/AssignmentReport/SubmittedAssignmentInfo";
import Feedbacks from "../components/AssignmentReport/Feedbacks";
import SubmitFeedback from "../components/AssignmentReport/SubmitFeedback";
import {motion} from "framer-motion";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";


const AssignmentReport = () => {
  const location = useLocation();
    let assignmentID = location.pathname.split("/")[2];

    const {getSubmittedAssignmentReport} = useContext(AssignmentContext);
    const {giveStudentMarks} = useContext(StudentContext);
    const [feedbacks, setFeedbacks] = useState([]);
    const [response, setResponse] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        handleGetSubmittedAssignmentReport();
    }, [counter]);

    useEffect(() => {
        handleGiveStudentMarks();
    }, [response]);

    const handleGetSubmittedAssignmentReport = async () => {
        const response = await getSubmittedAssignmentReport(assignmentID);
        if(response){
            setFeedbacks(response.submittedAssignment.feedback);
            console.log(response); 
            setResponse(response);
            setIsLoaded(true);
        }
    }

    const handleGiveStudentMarks = async () => {

        const assignmentID = response.assignment._id;
        const studentID = response.student._id;
        let studentAnswer = response.submittedAssignment.answer;
        let correctAnswer = response.assignment.answers;

        studentAnswer = await getDownloadURL(ref(storage, studentAnswer));
        correctAnswer = await getDownloadURL(ref(storage, correctAnswer));
        await giveStudentMarks(assignmentID, studentID, studentAnswer, correctAnswer);

    }
    

  return (
    <>
    {isLoaded ?
    <div className="h-screen w-full -mt-8">
      <motion.h1
      initial={{y: -100}}
        animate={{y: 0}}
        transition={{duration: 0.7}}
      className="text-center font-semibold text-4xl my-4">
        Assignment
        <span className="text-blue-500 ml-2">Report</span>
      </motion.h1>
    <div className="w-full md:flex justify-center my-8">
        <div className="md:w-1/2">
            <SubmittedAssignmentInfo a={response} isStudent={false} setCounter={setCounter} />
        </div>
        <div className="md:w-1/2">
            <Feedbacks feedbacks={feedbacks} />
            <SubmitFeedback assignmentId={assignmentID} setCounter={setCounter} answerID={response.submittedAssignment.answer} />
        </div>
    </div>

    </div>: <div className="h-screen w-full flex justify-center items-center"></div>}
    </>
  );
};

export default AssignmentReport;
