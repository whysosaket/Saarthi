import { useLocation } from "react-router-dom";
import SubmitAssignmentInfo from "./AssignmentInfo";
import UploadAssignment from "../Submit/UploadAssignment";
import { useContext, useEffect, useState } from "react";
import AssignmentContext from "../../context/AssignmentContext";


const AssignmentDashboard = () => {
  const location = useLocation();
    let assignmentID = location.pathname.split("/")[2];

    const {getAssignment} = useContext(AssignmentContext);
    const [assignment, setAssignment] = useState({dueDate: ""});
    // const [isPastDue, setIsPastDue] = useState(false);

    useEffect(() => {
        handleGetAssignment();
    }, []);

    const handleGetAssignment = async () => {
        const response = await getAssignment(assignmentID);
        if(response){
            setAssignment(response);
        }
    }

  return (
    <div className="my-8 h-screen w-full">
      <h1 className="text-center font-semibold text-4xl my-4">
        
        Assignment
        <span className="text-blue-500 ml-2">Dashboard</span>
      </h1>
    <div className="w-full flex justify-center my-8">
        <div className="w-1/2">
            <SubmitAssignmentInfo assignmentID={assignmentID} />
        </div>
        <div className="w-1/2">
            <UploadAssignment assignmentID={assignmentID} />
        </div>
    </div>

    </div>
  );
};

export default AssignmentDashboard;
