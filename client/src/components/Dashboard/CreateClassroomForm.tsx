import {
  MdOutlineDriveFileRenameOutline,
  MdSubject,
  MdOutlineDescription,
} from "react-icons/md";
import { motion } from "framer-motion";
import ClassroomContext from "../../context/ClassroomContext";
import { useContext, useRef, useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";

const CreateClassroomForm = () => {
  const { createClassroom, toastMessage } = useContext(ClassroomContext);
  const nameRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [copyActive, setCopyActive] = useState(false);
  const [url, setUrl] = useState("");

  const handleCreateClassroom = async () => {
    const name: string = nameRef.current?.value || "";
    const subject: string = subjectRef.current?.value || "";
    const description: string = descriptionRef.current?.value || "";
    if (name == "" || subject == "" || description == "") {
      return;
    }
    const response = await createClassroom(name, subject, description);
    if (response) {
        setUrl(response);
        setCopyActive(true);
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: 300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="p-8 md:w-1/2"
      >
        {copyActive ? (
          <CopyUrl url={url} toastMessage={toastMessage}  />
        ) : (
          <>
            <div className="bg-gray-100 bg-opacity-10 rounded-xl py-12 px-4 lg:px-24">
              <div className="mt-6">
                <div className="relative">
                  <input
                    className="appearance-none border pl-12 border-gray-100/20 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-3xl w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                    type="text"
                    placeholder="Classroom Name"
                    ref={nameRef}
                  />
                  <div className="absolute left-0 inset-y-0 flex items-center">
                    <MdOutlineDriveFileRenameOutline className="h-7 w-7 ml-3 text-gray-400 p-1" />
                  </div>
                </div>
                <div className="relative mt-3">
                  <input
                    className="appearance-none border pl-12 border-gray-100/20 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-3xl w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-200 focus:shadow-outline"
                    type="text"
                    placeholder="Subject"
                    ref={subjectRef}
                  />
                  <div className="absolute left-0 inset-y-0 flex items-center">
                    <MdSubject className="h-7 w-7 ml-3 text-gray-400 p-1" />
                  </div>
                </div>
                <div className="relative mt-3">
                  <input
                    className="appearance-none border pl-12 border-gray-100/20 shadow-sm focus:shadow-md focus:placeholder-gray-200  transition  rounded-3xl w-full py-3 text-gray-200 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                    type="text"
                    placeholder="Description"
                    ref={descriptionRef}
                  />
                  <div className="absolute left-0 inset-y-0 flex items-center">
                    <MdOutlineDescription className="h-7 w-7 ml-3 text-gray-400 p-1" />
                  </div>
                </div>
                <div className="flex items-center justify-center mt-8">
                  <button
                    onClick={handleCreateClassroom}
                    className="text-white py-2 px-4 rounded-3xl flex items-center bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                  >
                    <SiGoogleclassroom className="mr-2" size={20} />
                    <span className="my-auto">Create</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

const CopyUrl = (props: { url: string, toastMessage: any }) => {
    const hadnleToastMessage = () => {
        navigator.clipboard.writeText(props.url);
        props.toastMessage("Link Copied", "success");
    }
  return (
    <>
      <div className="bg-gray-100 bg-opacity-10 rounded-xl py-12 px-4 lg:px-24 flex flex-col">
        <h1 className="text-center my-4 font-semibold">Congratulations Classroom Created</h1>
        <div className="bg-gray-100 bg-opacity-20 rounded-xl p-4 text-center">
          {props.url}
        </div>
        <button
        onClick={hadnleToastMessage}
        className="text-white py-2 px-4 my-4 rounded-xl bg-blue-500 hover:bg-blue-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
          Copy
        </button>
      </div>
    </>
  );
};

export default CreateClassroomForm;
