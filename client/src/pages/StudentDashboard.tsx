
import StudentVerticalNavbar from '../components/Student/StudentVerticalNavbar'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'
import Classrooms from '../components/Student/StudentClassrooms'
import Assignments from '../components/Student/StudentAssignments'


const StudentDashboard = () => {
    const { activeComponent } = useContext(GlobalContext);
  return (
    <>
    <div className="bg-gray-900 bg-opacity-50 min-h-screen flex justify-center w-full">
        <div className="flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
          {/* Navigation */}
          <StudentVerticalNavbar />
          {/* Content */}

            {activeComponent === "classrooms" && <Classrooms />}
            {/* {activeComponent === "createClassrooms" && <CreateClassroom />} */}
            {activeComponent === "assignments" && <Assignments />}
            {/* {activeComponent === "classroom" && <Classroom />} */}
            {/* {activeComponent === "createAssignments" && <CreateAssignment />} */}

        </div>
      </div>
    </>
  )
}

export default StudentDashboard