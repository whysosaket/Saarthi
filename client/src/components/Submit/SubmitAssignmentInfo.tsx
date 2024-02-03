import AssignmentContext from "../../context/AssignmentContext"
import GlobalContext from "../../context/GlobalContext";
import { useEffect, useState, useContext } from "react"
import {getDownloadURL, ref} from "firebase/storage";
import { storage } from "../../firebase";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";

const SubmitAssignmentInfo = (props: {assignmentID: string}) => {

    const {getAssignment, getSubmissions} = useContext(AssignmentContext);
    const {handleComponentChange} = useContext(GlobalContext);
    const [assignment, setAssignment] = useState({assignmentName: "", description: "", dueDate: "", assignedDate: "", questions: ""});
    const [track, setTrack] = useState({status: "", _id: "", submittedDate: ""});
    const navigate = useNavigate();

    useEffect(() => {
        handleGetAssignment();
    }, []);

    const handleGetAssignment = async () => {
        const response = await getAssignment(props.assignmentID);
        if(response){
            setAssignment(response);
            handleGetSubmissions(response._id);
        }
    }

    const handleDownloadQuestions = async () => {
        const url = await getDownloadURL(ref(storage, assignment.questions));
        window.open(url);
    }

    const handleGetSubmissions = async (id: string) => {
        const response = await getSubmissions(id);
        if(response){
            setTrack(response);
        }
    }

    const handleViewSubmission = () => {
        handleComponentChange("assignmentReport");
        navigate(`/studentassignmentreport/${track._id}`);
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
            <div className="flex justify-start">
                <button onClick={handleDownloadQuestions} className="bg-blue-500 flex items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <FaCloudDownloadAlt className="mr-2" size={20} />
                    Download Questions
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
            {
                track.status === "N/A" ? 
                <div className="text-lg font-semibold text-blue-500 mt-6">
                    Assignment Not Submitted
                </div> :
                <div className="text-white text-md font-bold mt-6">
                    <span className="text-lg font-semibold text-blue-500" >Status: </span>
                    {track.status}
                </div> 
            
            }
            {
                track.status === "N/A" ? 
                null :
                <div className="text-white text-sm font-extralight mt-6">
                    <span className="font-semibold mr-3">
                        Date Submitted:
                    </span>
                    {new Date(track.submittedDate).toDateString()}
                </div>
            }
            {
                track.status === "N/A" ? 
                null :
                <div className="flex justify-start mt-6">
                    <button onClick={handleViewSubmission} className="bg-yellow-500/90 flex items-center hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                        <TbReportAnalytics className="mr-2" size={20} />
                        Assignment Report
                    </button>
                </div>
            }
        </motion.div>
    </div>
  )
}

export default SubmitAssignmentInfo