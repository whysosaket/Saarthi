
import StudentVerticalNavbar from '../components/Student/StudentVerticalNavbar'
import { useContext, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext'
import Classrooms from '../components/Student/StudentClassrooms'
import Assignments from '../components/Student/StudentAssignments'
import Classroom from '../components/Student/StudentClassroom'
import StudentViewAssignment from '../components/Student/StudentViewAssignment'
import StudentAssignmentReport from './StudentAssignmentReport'

const items = ["classrooms", "assignments", "classroom", "viewAssignment", "assignmentReport"];

const StudentDashboard = () => {
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
    <div className="bg-gray-900 bg-opacity-50 min-h-screen flex justify-center w-full">
        <div className="flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
          {/* Navigation */}
          <StudentVerticalNavbar />
          {/* Content */}

            {activeComponent === "classrooms" && <Classrooms />}
            {activeComponent === "assignments" && <Assignments />}
            {activeComponent === "classroom" && <Classroom />}
            {activeComponent === "viewAssignment" && <StudentViewAssignment />}
            {activeComponent === "assignmentReport" && <StudentAssignmentReport />}

        </div>
      </div>
    </>
  )
}

export default StudentDashboard