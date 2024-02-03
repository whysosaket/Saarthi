import { useContext, useState, useEffect } from "react"
import ClassroomContext from "../../context/ClassroomContext"
import { motion } from "framer-motion"

const StudentClassroomAssignments = (props: {classroomID: string}) => {
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
    <div className="w-5/6 bg-white bg-opacity-5 p-6 rounded-xl mx-auto">
        <h1 className="font-semibold text-2xl mb-4">Assignments</h1>
        <div className="max-h-64 overflow-y-scroll">
        {
           assignments.map((student: any, index: number) => {
                return (
                <motion.div
                initial={{opacity: 0.0, x: 50+index*20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.3, delay: index*0.1}}
                key={index} className={`justify-between  items-center mb-4 bg-white/10 p-4 rounded-lg`}>
                    <p className="font-semibold">{student.assignmentName}</p>
                    <p>{student.description}</p>
                    <p className="font-semibold text-blue-500">{new Date(student.dueDate).toDateString()}</p>
                    <button className="bg-blue-500 text-white px-2 py-1 font-semibold rounded-md my-2 hover:bg-blue-600">Submit</button>
                </motion.div>
                )
            })
        }
        </div>
    </div>
  )
}

export default StudentClassroomAssignments