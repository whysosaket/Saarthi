import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaFolder } from "react-icons/fa";
import AssignmentContext from "../../context/AssignmentContext";
import { storage } from "../../firebase";
import {ref, uploadBytes} from "firebase/storage";
import { v4  } from "uuid";
import { FiUploadCloud } from "react-icons/fi";
import { MdLayersClear } from "react-icons/md";

const AssignmentUploadForm = () => {
  const {toastMessage, handlePostUpload} = useContext(AssignmentContext);
  const [questionFileName, setQuestionFileName] = useState("");
  const [answerFileName, setAnswerFileName] = useState("");

  const [questionFile, setQuestionFile] = useState<File | null>(null);
  const [answerFile, setAnswerFile] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileChange = (event: any, type: any) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : "";
    type === "question"
      ? setQuestionFileName(fileName)
      : setAnswerFileName(fileName);

    type === "question" ? setQuestionFile(file) : setAnswerFile(file);
  };

  const handleFileUpload = async () => {
    if (questionFileName === "" || answerFileName === "") {
        toastMessage("Please select both files", "error");
      return;
    }

    if (questionFile === null || answerFile === null) {
        toastMessage("Please select both files", "error");
      return;
    }

    const uuidQuestion = v4();
    const uuidAnswer = v4();

    const finalQuestionName = uuidQuestion + ".pdf";
    const finalAnswerName = uuidAnswer + ".pdf";

    const questionRef = ref(storage, `questions/${finalQuestionName}`);
    const answerRef = ref(storage, `answers/${finalAnswerName}`);

    const questionUploadTask = await uploadBytes(questionRef, questionFile);
    const answerUploadTask = await uploadBytes(answerRef, answerFile);

    let questionUrl = questionUploadTask.metadata.fullPath;
    let answerUrl = answerUploadTask.metadata.fullPath;

    handlePostUpload(questionUrl, answerUrl);
    setIsUploaded(true);
  };

  const clearSelection = () => {
    setQuestionFileName("");
    setAnswerFileName("");
    setQuestionFile(null);
    setAnswerFile(null);
    setIsUploaded(false);
    handlePostUpload("", "");
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0,y: 300 }}
        animate={{ opacity: 1,y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-4/5 flex justify-center md:w-full mx-auto sm:max-w-lg"
      >
        <div className="flex flex-col items-center justify-center w-full h-auto my-8 py-6 bg-white/10 sm:w-3/4 sm:rounded-lg sm:shadow-xl">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
            <p className="text-xs text-gray-500">
              Files should be of format .pdf
            </p>
          </div>

          <div className="relative w-4/5 h-32 max-w-xs mb-10 bg-white/10 rounded-lg shadow-inner">
            <input
              type="file"
              id="question-file-upload"
              className="hidden"
              onChange={(event) => handleFileChange(event, "question")}
            />
            <label
              htmlFor="question-file-upload"
              className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
            >
              <p className="z-10 text-xs font-light text-center text-gray-200">
                {questionFileName || "Drag & Drop Questions Here"}
              </p>
              <FaFolder className="z-10 w-8 h-8 text-blue-400" />
            </label>
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
                  onClick={clearSelection}
                  className="text-white py-2 px-4 rounded-xl flex items-center  bg-red-500 hover:bg-red-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  <MdLayersClear className="mr-2" size={20} />
                  Clear Selection
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full">
                <button
                  onClick={handleFileUpload}
                  className="text-white py-2 px-4 rounded-3xl flex items-center bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  <FiUploadCloud className="mr-2" size={20} />
                  Upload
                </button>
              </div>
            )
          }
        </div>
      </motion.div>
    </>
  );
};

export default AssignmentUploadForm;
