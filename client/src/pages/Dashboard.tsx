import Classrooms from "../components/Dashboard/Classrooms";
import Assignments from "../components/Dashboard/Assignments";
import CreateClassroom from "../components/Dashboard/CreateClassroom";
import VerticalNavbar from "../components/Dashboard/VerticalNavbar";
import { useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import Classroom from "../components/Dashboard/Classroom";

const Dashboard = () => {
  const { activeComponent, handleComponentChange } = useContext(GlobalContext);

  useEffect(() => {
    // setting scroll to top
    window.scrollTo(0, 0);
  }, []);

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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
