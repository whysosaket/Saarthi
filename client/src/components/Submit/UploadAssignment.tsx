import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaFolder } from "react-icons/fa";
import AssignmentContext from "../../context/AssignmentContext";
import { storage } from "../../firebase";
import {ref, uploadBytes} from "firebase/storage";
import { v4  } from "uuid";
import { FaCloudUploadAlt } from "react-icons/fa";
import { TiTickOutline } from "react-icons/ti";

const UploadAssignment = (props: {assignmentID: string}) => {
  const {toastMessage, submitAssignment } = useContext(AssignmentContext);
  const [answerFileName, setAnswerFileName] = useState("");
  const [answerFile, setAnswerFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (event: any, type: any) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : "";
    setAnswerFileName(fileName);
    setAnswerFile(file);
  };

  const handleFileUpload = async () => {
    if (answerFileName === "") {
        toastMessage("Please select a file", "error");
      return;
    }

    if (answerFile === null) {
        toastMessage("Please select a file", "error");
      return;
    }
    const uuidAnswer = v4();
    const finalAnswerName = uuidAnswer + ".pdf";
    const answerRef = ref(storage, `answers/${finalAnswerName}`);
    const answerUploadTask = await uploadBytes(answerRef, answerFile);
    let answerUrl = answerUploadTask.metadata.fullPath;

    let response  = await submitAssignment(props.assignmentID, answerUrl);
    if(response){
      setIsUploaded(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 300 }}
        animate={{ opacity: 1,y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex justify-center w-full mx-auto sm:max-w-lg"
      >
        <div className="flex flex-col items-center justify-center w-full h-auto  py-10 bg-white/10 sm:rounded-lg sm:shadow-xl">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload your Assignment</h2>
            <p className="text-xs text-gray-500">
              Files should be of format .pdf
            </p>
          </div>

          <div className="relative w-4/5 h-32 max-w-xs mb-10 bg-white/10 rounded-lg shadow-inner">
            <input
              type="file"
              id="answer-file-upload"
              className="hidden"
              onChange={(event) => handleFileChange(event, "answer")}
            />
            <label
              htmlFor="answer-file-upload"
              className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
            >
              <p className="z-10 text-xs font-light text-center text-gray-200">
                {answerFileName || "Drag & Drop your Answers Here"}
              </p>
              <FaFolder className="z-10 w-8 h-8 text-blue-400" />
            </label>
          </div>
          {
            isUploaded ? (
              <div className="flex items-center justify-center w-full">
                <button
                  disabled={isUploaded}
                  className="text-white py-2 px-4 flex items-center rounded-xl bg-green-500 hover:bg-green-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  <TiTickOutline className="mr-2" size={20} />
                  Assignment Uploaded
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <button
                  onClick={handleFileUpload}
                  className="text-white py-2 px-4 rounded flex items-center bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  <FaCloudUploadAlt className="mr-2" size={20} />
                  Upload Assignment
                </button>
              </div>
            )
          }
        </div>
      </motion.div>
    </>
  );
};

export default UploadAssignment;
