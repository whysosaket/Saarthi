import { useContext, useState, useEffect } from "react"
import ClassroomContext from "../../context/ClassroomContext"
import { motion } from "framer-motion"

const ClassroomAssignments = (props: {classroomID: string}) => {
    const {getClassroomAssignments} = useContext(ClassroomContext);
    const [assignments, setAssignments] = useState<any[]>([]);
    useEffect(() => {
        handleGetClassroomAssignments();
    }, []);
    const handleGetClassroomAssignments = async () => {
        const response = await getClassroomAssignments(props.classroomID);
        if(response){
            setAssignments(response);
        }
    }
  return (
    <div className="md:w-5/6 bg-white bg-opacity-5 p-6 rounded-xl mx-auto mt-6">
        <h1 className="font-semibold text-2xl mb-4">Assignments</h1>
        <div className="max-h-44 overflow-y-scroll">
        {
           assignments.map((student: any, index: number) => {
                return (
                <motion.div
                initial={{opacity: 0.0, x: 50+index*20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.3, delay: index*0.1}}
                key={index} className={`justify-between  items-center mb-4 bg-white/10 p-4 rounded-lg`}>
                    <p className="font-semibold">{student.assignmentName}</p>
                    <p>Submissions: {student.submissions.length}</p>
                    <p className="font-semibold text-blue-500">Due Date: {new Date(student.dueDate).toDateString()}</p>
                </motion.div>
                )
            })
        }
        </div>
    </div>
  )
}

export default ClassroomAssignments