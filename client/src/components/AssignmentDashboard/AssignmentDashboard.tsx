import { useLocation } from "react-router-dom";
import SubmitAssignmentInfo from "./AssignmentInfo";
import SubmittedAssignments from "./SubmittedAssignments";


const AssignmentDashboard = () => {
  const location = useLocation();
    const assignmentID = location.pathname.split("/")[2];
    // const [isPastDue, setIsPastDue] = useState(false);


  return (
    <div className="my-8 h-screen w-full">
      <h1 className="text-center font-semibold text-3xl md:text-4xl my-4">
        
        Assignment
        <span className="text-blue-500 ml-2">Dashboard</span>
      </h1>
    <div className="w-full md:flex justify-center my-8">
        <div className="md:w-1/2">
            <SubmitAssignmentInfo assignmentID={assignmentID} />
        </div>
        <div className="md:w-1/2 mx-8 md:mx-0 mt-6 md:mt-0">
            <SubmittedAssignments assignmentID={assignmentID} />
        </div>
    </div>

    </div>
  );
};

export default AssignmentDashboard;
