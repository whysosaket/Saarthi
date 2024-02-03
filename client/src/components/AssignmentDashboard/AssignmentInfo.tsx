import AssignmentContext from "../../context/AssignmentContext"
import { useEffect, useState, useContext } from "react"
import {getDownloadURL, ref} from "firebase/storage";
import { storage } from "../../firebase";
import {motion} from "framer-motion";

const AssignmentInfo = (props: {assignmentID: string}) => {

    const {getAssignment} = useContext(AssignmentContext);
    const [assignment, setAssignment] = useState({assignmentName: "", description: "", dueDate: "", assignedDate: "", questions: "", answers: "", submissions: []});

    useEffect(() => {
        handleGetAssignment();
    }, []);

    const handleGetAssignment = async () => {
        const response = await getAssignment(props.assignmentID);
        if(response){
            setAssignment(response);
        }
    }

    const handleDownloadQuestions = async () => {
        const url = await getDownloadURL(ref(storage, assignment.questions));
        window.open(url);
    }

    const handleDownloadAnswers = async () => {
        const url = await getDownloadURL(ref(storage, assignment.answers));
        window.open(url);
    }



  return (
    <div className="w-full px-8">
        <motion.div 
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2}}
        className="w-4/5 bg-white/5 rounded-xl p-8">
            <div className="text-white text-3xl font-semibold">
                {assignment.assignmentName}
            </div>
            <div className="text-white text-sm font-extralight">
                {assignment.description}
            </div>
            <div className="my-3 p-4 bg-white/5 rounded-lg">
                <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">
                        Due Date:
                    </span>
                    
                    {new Date(assignment.dueDate).toDateString()}
                </div>
                <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">
                    Date Assigned:
                    </span> 
                    {new Date(assignment.assignedDate).toDateString()}
                </div>
            </div>
            <div className="my-3 p-4 bg-white/5 rounded-lg">
                <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">
                        Total Submissions: 
                    </span>
                    
                    {assignment.submissions.length}
                </div>
            </div>
            <div className="flex justify-start">
                <button onClick={handleDownloadQuestions} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Download Questions
                </button>
                <button onClick={handleDownloadAnswers} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                    Download Answers
                </button>
            </div>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1,x: 0 }}
        transition={{ duration: 0.7, delay: 0.4}}
        className="w-4/5 bg-white/5 rounded-xl p-8 mt-6">
            <div className="text-white text-3xl font-semibold">
                Track Assignment
            </div>
            <div className="text-white text-sm font-extralight mt-6">
                {assignment.questions}
            </div>
        </motion.div>
    </div>
  )
}

export default AssignmentInfo