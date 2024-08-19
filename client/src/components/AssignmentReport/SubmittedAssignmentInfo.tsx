import { motion } from "framer-motion";
import { useState, useContext, useRef } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import AssignmentContext from "../../context/AssignmentContext";

const SubmittedAssignmentInfo = (props: { a: any, isStudent: boolean, setCounter: any }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {updateGrade, toastMessage} = useContext(AssignmentContext);
    const gradeRef = useRef<HTMLInputElement>(null);

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const downloadAnswer = async () => {
        const url = await getDownloadURL(ref(storage, props.a.submittedAssignment.answer));
        window.open(url, "_blank");
    }

    const handleUpdateGrade = async () => {
        const grade = gradeRef.current?.value || "";
        if(grade === ""){
            toastMessage("Please enter a grade", "error");
            return;
        }
        const response = await updateGrade(props.a.submittedAssignment._id, grade);
        if(response){
            props.setCounter((prev: number) => prev + 1);
            setIsModalOpen(false);
        }
    }

    
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-4/5 bg-white/5 rounded-xl p-2 md:p-8 mx-auto"
      >
        <div className="text-white text-2xl md:text-3xl font-semibold">
          {props.a.assignment.assignmentName}
        </div>
        <div className="text-white text-sm font-extralight">
        {props.a.assignment.description}
        </div>
        <div className="my-3 p-4 bg-white/5 rounded-lg">
          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Student Name:</span>

            {props.a.student.name}
          </div>
          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Student Email:</span>
            {props.a.student.email}
          </div>
        </div>
        <div className="my-3 p-4 bg-white/5 rounded-lg">
          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Submitted On:</span>

            {new Date(props.a.submittedAssignment.submittedDate).toDateString()}
          </div>
          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Status:</span>

            {props.a.submittedAssignment.status}
          </div>

          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Grade:</span>

            {
            props.a.submittedAssignment.grade&&props.a.submittedAssignment.grade.toFixed(2)
            }
          </div>
          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Dispute:</span>

            {props.a.submittedAssignment.dispute ? "Yes" : "No"}
          </div>
          {
            props.a.submittedAssignment.dispute &&
          
          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Dispute Message:</span>

            {props.a.submittedAssignment.disputeMessage}
          </div>
}

<div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Plagarism:</span>

            {props.a.submittedAssignment.plagarism ? "Yes" : "No"}
          </div>

          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">Internet Plagarism:</span>

            {props.a.submittedAssignment.plagarismChance&&props.a.submittedAssignment.plagarismChance.toFixed(2)}
          </div>
          <div className="text-white text-sm font-extralight">
            <span className="font-semibold mr-3">AI Plagarism:</span>

            {props.a.submittedAssignment.aiProbability&&props.a.submittedAssignment.aiProbability.toFixed(2)}
          </div>
        </div>
        {!props.isStudent && 
        <div className="flex justify-center md:justify-start">
          <button onClick={downloadAnswer} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-3xl ml-4 flex items-center">
            <FaCloudDownloadAlt className="mr-2 my-auto" />
            Answer
          </button>
          <button onClick={handleModal} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-3xl ml-4 flex items-center">
            <RxUpdate className="mr-2 my-auto" />
            {isModalOpen ? "Close" : "Grade"}
          </button>
        </div>}
      </motion.div>
      {isModalOpen &&
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="w-4/5 bg-white/5 rounded-xl p-8 mx-auto mt-8"
      >
        <div className="text-white text-3xl font-semibold">Update Grade</div>
        <input
          className="appearance-none border pl-6 bg-white/10 border-gray-100/50 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-3xl w-full py-2 text-gray-200 leading-tight focus:outline-none focus:shadow-outline mt-4"
          type="text"
          placeholder="Grade"
          ref={gradeRef}
        />
        <div className="flex justify-start mt-4">
          <button onClick={handleUpdateGrade} className="bg-gray-700 hover:bg-gray-900 bg-opacity-60 text-white font-bold py-2 px-4 rounded-3xl">
            Update
          </button>
        </div>
      </motion.div>}
    </>
  );
};

export default SubmittedAssignmentInfo;
