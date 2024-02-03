import { motion } from "framer-motion";
import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { storage } from "../../firebase";
import { ref, getDownloadURL } from "firebase/storage";

const SubmittedAssignmentInfo = (props: { a: any }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const downloadAnswer = async () => {
        const url = await getDownloadURL(ref(storage, props.a.submittedAssignment.answer));
        window.open(url, "_blank");
    }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-4/5 bg-white/5 rounded-xl p-8 mx-auto"
      >
        <div className="text-white text-3xl font-semibold">
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

            {props.a.submittedAssignment.grade}
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
        </div>
        <div className="flex justify-start">
          <button onClick={downloadAnswer} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4 flex">
            <FaCloudDownloadAlt className="mr-2 my-auto" />
            Download Answer
          </button>
          <button onClick={handleModal} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4 flex">
            <RxUpdate className="mr-2 my-auto" />
            {isModalOpen ? "Close" : "Update Grade"}
          </button>
        </div>
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
          className="appearance-none border pl-6 bg-white/10 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-md w-full py-2 text-gray-200 leading-tight focus:outline-none focus:shadow-outline mt-4"
          type="text"
          placeholder="Grade"
          // ref={nameRef}
        />
        <div className="flex justify-start mt-4">
          <button className="bg-gray-700 hover:bg-gray-900 bg-opacity-60 text-white font-bold py-2 px-4 rounded ml-4">
            Update Grade
          </button>
        </div>
      </motion.div>}
    </>
  );
};

export default SubmittedAssignmentInfo;