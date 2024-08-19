import AssignmentContext from "../../context/AssignmentContext"
import { useEffect, useState, useContext } from "react"
import {getDownloadURL, ref} from "firebase/storage";
import { storage } from "../../firebase";
import {motion} from "framer-motion";
import GlobalContext from "../../context/GlobalContext";
import StudentContext from "../../context/StudentContext";
import { useNavigate } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { LuDownloadCloud } from "react-icons/lu";

const AssignmentInfo = (props: {assignmentID: string}) => {

    const {getAssignment, deleteAssignment, getSubmittedAssignments} = useContext(AssignmentContext);
    const {handleComponentChange, toastMessage} = useContext(GlobalContext);
    const {checkPlagarism} = useContext(StudentContext);
    const [assignment, setAssignment] = useState({_id: "", assignmentName: "", description: "", dueDate: "", assignedDate: "", questions: "", answers: "", submissions: []});

    const navigate = useNavigate();

    useEffect(() => {
        handleGetAssignment();
    }, []);

    const handleGetAssignment = async () => {
        const response = await getAssignment(props.assignmentID);
        if(response){
            setAssignment(response);
        }else{
            handleComponentChange("classrooms");
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

    const handleDeleteAssignment = async () => {
        const response = await deleteAssignment(props.assignmentID);
        if(response){
            handleComponentChange("classrooms");
            navigate("/dashboard");
        }
    }

    const handleCheckPlagarism = async () => {
        // const response = await checkPlagarism(props.assignmentID);
        const getSubmittedAssignmentsResponse = await getSubmittedAssignments(props.assignmentID);

        let studentIDs:any = [];
        getSubmittedAssignmentsResponse.forEach((submission: any) => {
            studentIDs.push(submission.id);
        });

        let answers:any = [];
        for (let i = 0; i < studentIDs.length; i++) {
            const url = await getDownloadURL(ref(storage, getSubmittedAssignmentsResponse[i].submission.answer));
            answers.push(url);
        }
        
        toastMessage("Plagarism check initiated", "success");

        await checkPlagarism(assignment._id, studentIDs, answers);
    }



  return (
    <div className="w-full px-8">
        <motion.div 
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2}}
        className="md:w-4/5 bg-white/5 rounded-xl p-8">
            <div className="text-white text-2xl md:text-3xl font-semibold">
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
                    
                    {assignment.submissions&&assignment.submissions.length}
                </div>
            </div>
            <div className="flex justify-start">
                <button onClick={handleDownloadQuestions} className="bg-blue-600/80 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl flex items-center">
                    <LuDownloadCloud className="my-auto h-5 w-5 mr-2" />
                    Questions
                </button>
                <button onClick={handleDownloadAnswers} className="bg-green-600/80 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl ml-4 flex items-center">
                    <LuDownloadCloud className="my-auto h-5 w-5 mr-2" />
                    Answers
                </button>
            </div>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1,x: 0 }}
        transition={{ duration: 0.7, delay: 0.4}}
        className="md:w-4/5 bg-white/5 rounded-xl p-8 mt-6">
            <div className="text-white text-2xl md:text-3xl font-semibold">
                Manage Assignment
            </div>
            <div className="text-white text-sm font-extralight mt-6 flex justify-center md:justify-start">
                <button onClick={handleDeleteAssignment} className="bg-red-600/80 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded-3xl flex items-center">
                    <MdDeleteOutline className=" my-auto h-5 w-5 mr-2" />
                    Delete
                </button>
                <button onClick={handleCheckPlagarism} className="bg-yellow-500/80 hover:bg-yellow-700 text-white cursor-pointer font-bold py-2 px-4 rounded-3xl ml-4 flex items-center">
                    <FaRegCopy className="my-auto h-5 w-5 mr-2" />
                    Plagarism
                </button>
            </div>
        </motion.div>
    </div>
  )
}

export default AssignmentInfo