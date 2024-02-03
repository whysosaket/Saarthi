import {createContext, useEffect, useState} from "react";
const AssignmentContext = createContext<any>({});
import { toast } from "react-toastify";

let url = import.meta.env.VITE_URL;

const AssignmentState = (props: any) => {

    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };

    const [questionLink, setQuestionLink] = useState("");
    const [answerLink, setAnswerLink] = useState("");

    useEffect(() => {
     
    },[]);

    const getAllAssignments = async () => {
        try {
            const res = await fetch(`${url}/api/assignments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
            });
            const data = await res.json();
            if (data.success) {
                return data.assignments;
            } else {
                toastMessage(data.error, "error");
                return [];
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    const handlePostUpload = (question: string, answer: string) => {
        setQuestionLink(question);
        setAnswerLink(answer);
    }

    const createAssignment = async (name: string, classroom: string, description: string, dueDate: string) => {
        try {
            const res = await fetch(`${url}/api/assignment/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
                body: JSON.stringify({ assignmentName: name, classroomID: classroom, description, dueDate, questions: questionLink, answer: answerLink }),
            });
            const data = await res.json();
            if (data.success) {
                toastMessage("Assignment created successfully", "success");
                handlePostUpload("", "");
                return true;
            } else {
                toastMessage(data.error, "error");
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const getAssignment = async (assignmentID: string) => {
        try {
            const res = await fetch(`${url}/api/assignment/${assignmentID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
            });
            const data = await res.json();
            if (data.success) {
                return data.assignment;
            } else {
                toastMessage(data.error, "error");
                return {};
            }
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    const submitAssignment = async (assignmentId: string, answer: string) => {
        try {
            const res = await fetch(`${url}/api/assignment/addstudentassignment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
                body: JSON.stringify({ assignmentId, answer }),
            });
            const data = await res.json();
            if (data.success) {
                toastMessage("Assignment submitted successfully", "success");
                return true;
            } else {
                toastMessage(data.error, "error");
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    return (
        <AssignmentContext.Provider value={{toastMessage, getAssignment,submitAssignment,  getAllAssignments, questionLink, answerLink, handlePostUpload, createAssignment}}>
        {props.children}
        </AssignmentContext.Provider>
    )
}

export default AssignmentContext;
export {AssignmentState};