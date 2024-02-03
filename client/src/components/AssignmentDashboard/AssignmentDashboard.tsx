import { useLocation } from "react-router-dom";
import SubmitAssignmentInfo from "./AssignmentInfo";
import SubmittedAssignments from "./SubmittedAssignments";


const AssignmentDashboard = () => {
  const location = useLocation();
    let assignmentID = location.pathname.split("/")[2];
    // const [isPastDue, setIsPastDue] = useState(false);


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
            <SubmittedAssignments assignmentID={assignmentID} />
        </div>
    </div>

    </div>
  );
};

export default AssignmentDashboard;
