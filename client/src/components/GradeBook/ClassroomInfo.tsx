import {motion} from "framer-motion";
import { useEffect } from "react";

const ClassroomInfo = (props: {classroomInfo: any, gradeInfo: any}) => {

    useEffect(() => {
        console.log(props.classroomInfo);
        console.log(props.gradeInfo);
    }, [props.classroomInfo, props.gradeInfo]);
  return (
    <div className="w-full px-8">
        <motion.div 
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2}}
        className="w-4/5 bg-white/5 rounded-xl p-8">
            <div className="text-white text-3xl font-semibold">
                {props.classroomInfo && props.classroomInfo.className}
            </div>
            <div className="text-white text-sm font-extralight">
                {props.classroomInfo && props.classroomInfo.subject}
            </div>
            <div className="my-3 p-4 bg-white/5 rounded-lg">
                <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">
                        Average Grade:
                    </span>
                    
                    {props.gradeInfo && props.gradeInfo.totalAverageGrade.toFixed(2)}
                </div>
                <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">
                        Submission Ratio:
                    </span> 
                    {props.gradeInfo && props.gradeInfo.submissionRatio.toFixed(2)}
                </div>
            </div>
            <div className="my-3 p-4 bg-white/5 rounded-lg">
                <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">
                        Total Assignments:
                    </span>
                    
                    {props.gradeInfo && props.gradeInfo.assignmentAverageGrade.length}
                </div>
                <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">
                       Total Students:
                    </span> 
                    {props.classroomInfo && props.classroomInfo.studentIds.length}
                </div>
                <div className="text-white text-sm font-extralight">
                    <span className="font-semibold mr-3">
                       Total Submissions:
                    </span> 
                    {Math.round(props.classroomInfo && props.classroomInfo.studentIds.length * props.gradeInfo.assignmentAverageGrade.length * props.gradeInfo.submissionRatio)}
                </div>
            </div>
        </motion.div>

        <motion.div 
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4}}
        className="w-4/5 bg-white/5 rounded-xl p-8 my-4">
            <div className="text-white text-3xl font-semibold">
                Assignments Info
            </div>
            {
                props.gradeInfo && props.gradeInfo.assignmentAverageGrade.map((assignment: any, index: number) => {
                    return (
                        <motion.div
                        initial={{opacity: 0.0, x: 50+index*20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.3, delay: 0.5+index*0.1}}
                        key={index} className="my-3 p-4 bg-white/5 rounded-lg">
                            <div className="text-white text-sm font-extralight">
                                <span className="font-semibold mr-3">
                                    Assignment Name:
                                </span>
                                {assignment.assignment}
                            </div>
                            <div className="text-white text-sm font-extralight">
                                <span className="font-semibold mr-3">
                                    Average Grade:
                                </span>
                                {assignment.averageGrade.toFixed(2)}
                            </div>
                            <div className="text-white text-sm font-extralight">
                                <span className="font-semibold mr-3">
                                    Total Submissions:
                                </span>
                                {Math.round(props.classroomInfo && props.classroomInfo.studentIds.length * props.gradeInfo.assignmentSubmissionRatio[index].submissionRatio)}
                            </div>
                        </motion.div>
                    )
                }
                )
            }
            
        </motion.div>

       
    </div>
  )
}

export default ClassroomInfo