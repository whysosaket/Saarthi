import { useLocation } from "react-router-dom";
import SubmitAssignmentInfo from "../components/Submit/SubmitAssignmentInfo";
import UploadAssignment from "../components/Submit/UploadAssignment";
import { useContext, useEffect, useState } from "react";
import AssignmentContext from "../context/AssignmentContext";


const StudentSubmitAssignment = () => {
  const location = useLocation();
    let assignmentID = location.pathname.split("/")[2];

    const {getAssignment} = useContext(AssignmentContext);
    const [assignment, setAssignment] = useState({dueDate: ""});
    const [isPastDue, setIsPastDue] = useState(false);

    useEffect(() => {
        handleGetAssignment();
    }, []);

    const handleGetAssignment = async () => {
        const response = await getAssignment(assignmentID);
        if(response){
            setAssignment(response);
            const dueDate = new Date(response.dueDate);
            const currentDate = new Date();
            if(dueDate < currentDate){
                setIsPastDue(true);
            }
        }
    }

  return (
    <div className="my-8 h-screen ">
      <h1 className="text-center font-semibold text-4xl my-4">
        <span className="text-blue-500 mr-2">Submit</span>
        Assignment
      </h1>
    <div className="w-full flex justify-center my-8">
        <div className="w-1/2">
            <SubmitAssignmentInfo assignmentID={assignmentID} />
        </div>
        <div className="w-1/2">
            {!isPastDue&&<UploadAssignment assignmentID={assignmentID} />}
        </div>
    </div>

    </div>
  );
};

export default StudentSubmitAssignment;
