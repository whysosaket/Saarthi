import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {motion} from "framer-motion";
import ClassroomContext from "../context/ClassroomContext";
import GlobalContext from "../context/GlobalContext";
import ClassroomInfo from "../components/GradeBook/ClassroomInfo";
import Students from "../components/GradeBook/Students";

const GradeBook = () => {
  const location = useLocation();
    let assignmentID = location.pathname.split("/")[2];

    const {getGradeBook, getClassroomInfo} = useContext(ClassroomContext);
    const {handleComponentChange} = useContext(GlobalContext);
    const [response, setResponse] = useState<any>(null);
    const [classroomInfo, setClassroomInfo] = useState<any>(null)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        handleGetGradeBook();
    }, []);

    const handleGetGradeBook = async () => {
        const response = await getGradeBook(assignmentID);
        if(response){
            if(response.length === 0){
                handleComponentChange("classrooms");
            }
            setResponse(response);
        }else{
            handleComponentChange("classrooms");
        }
        const classroomInfo = await getClassroomInfo(assignmentID);
        if(classroomInfo){
            console.log(classroomInfo);
            setClassroomInfo(classroomInfo);
            setIsLoaded(true);
        }else{
            handleComponentChange("classrooms");
        }
        
    }

  return (
    <>
    {isLoaded ?
    <div className="h-screen w-full">
      <motion.h1
      initial={{y: -100}}
        animate={{y: 0}}
        transition={{duration: 0.7}}
      className="text-center font-semibold text-4xl">
        Grade
        <span className="text-blue-500 ml-2">Book</span>
      </motion.h1>
    <div className="w-full md:flex justify-center my-8">
        <div className="md:w-1/2">
           <ClassroomInfo classroomInfo={classroomInfo} gradeInfo={response} />
        </div>
        <div className="md:w-1/2">
            <Students classroomInfo={classroomInfo} />
        </div>
    </div>

    </div>: <div className="h-screen w-full flex justify-center items-center"></div>}
    </>
  );
};

export default GradeBook;
