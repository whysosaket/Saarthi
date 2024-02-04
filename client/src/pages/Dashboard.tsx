import Classrooms from "../components/Dashboard/Classrooms";
import Assignments from "../components/Dashboard/Assignments";
import CreateClassroom from "../components/Dashboard/CreateClassroom";
import CreateAssignment from "../components/Dashboard/CreateAssignment";
import VerticalNavbar from "../components/Dashboard/VerticalNavbar";
import { useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Classroom from "../components/Dashboard/Classroom";
import AssignmentDashboard from "../components/AssignmentDashboard/AssignmentDashboard";
import AssignmentReport from "./AssignmentReport";
import GradeBook from "./GradeBook";

const items = ["classrooms", "assignments", "classroom", "createClassrooms", "createAssignments", "viewAssignment", "assignmentReport", "gradeBook"];

const Dashboard = () => {
  const { activeComponent, handleComponentChange } = useContext(GlobalContext);
    useEffect(() => {
      if (items.includes(activeComponent)) {
        handleComponentChange(activeComponent);
      } else {
        handleComponentChange("classrooms");
      }
      // setting scroll to top
      window.scrollTo(0, 0);
    }, [activeComponent]);

  return (
    <>
      {/* component */}
      <div className="bg-gray-900 bg-opacity-50 min-h-screen flex justify-center w-full">
        <div className="flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
          {/* Navigation */}
          <VerticalNavbar />
          {/* Content */}
          {activeComponent === "classrooms" && <Classrooms />}
          {activeComponent === "createClassrooms" && <CreateClassroom />}
          {activeComponent === "assignments" && <Assignments />}
          {activeComponent === "classroom" && <Classroom />}
          {activeComponent === "createAssignments" && <CreateAssignment />}
          {activeComponent === "viewAssignment" && <AssignmentDashboard />}
          {activeComponent === "assignmentReport" && <AssignmentReport />}
          {activeComponent === "gradeBook" && <GradeBook />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
