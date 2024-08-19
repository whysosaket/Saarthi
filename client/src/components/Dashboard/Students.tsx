import { MdOutlineDeleteOutline } from "react-icons/md";
import {motion} from "framer-motion";
import { useContext, useState } from "react";
import ClassroomContext from "../../context/ClassroomContext";

const Students = (props: {students: any, classroomID: string}) => {
    const {removeClassroomStudent} = useContext(ClassroomContext);
    const [removedStudents, setRemovedStudents] = useState<string[]>([]);

    const handleDeleteStudent = async (studentID: string) => {
        await removeClassroomStudent(studentID, props.classroomID);
        setRemovedStudents([...removedStudents, studentID]);
    }
  return (
    <div className='md:w-5/6 bg-white bg-opacity-5 p-6 rounded-xl mx-auto'>
        <h1 className="font-semibold text-2xl mb-4">Students</h1>
        <div className="max-h-60 overflow-y-scroll">
        {
            props.students.map((student: any, index: number) => {
                return (
                <motion.div
                initial={{opacity: 0.0, x: 50+index*20}}
                animate={{opacity: 1, x: 0}}
                transition={{duration: 0.3, delay: index*0.1}}
                key={index} className={`flex justify-between  items-center mb-4 bg-white/10 p-4 rounded-lg ${removedStudents.includes(student.studentId)&&"hidden"}`}>
                    <p>{student.name}</p>
                    <p>{student.email}</p>
                    <MdOutlineDeleteOutline
                    onClick={() => {handleDeleteStudent(student.studentId)
                }}
                    className="cursor-pointer hover:text-red-500" size={25} />
                </motion.div>
                )
            })
        }
        </div>
    </div>
  )
}

export default Students