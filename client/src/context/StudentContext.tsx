import {createContext, useEffect} from "react";
const StudentContext = createContext<any>({});
import { toast } from "react-toastify";

let url = import.meta.env.VITE_URL;

const StudentState = (props: any) => {

    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };

    useEffect(() => {
     
    },[]);

    const getMyClassrooms = async () => {
        try {
            const res = await fetch(`${url}/api/student/classrooms`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem("auth-token")!,
                },
            });
            const data = await res.json();
            if (data.success) {
                return data.classrooms;
            }else {
                toastMessage(data.error, "error");
                return [];
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    const getMyAssignments = async () => {
        try {
            const res = await fetch(`${url}/api/student/assignments`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem("auth-token")!,
                },
            });
            const data = await res.json();
            if (data.success) {
                return data.assignments;
            }else {
                toastMessage(data.error, "error");
                return [];
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    const getStudent = async (studentID: string) => {
        try {
            const res = await fetch(`${url}/api/student/${studentID}`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem("auth-token")!,
                },
            });
            const data = await res.json();
            if (data.success) {
                return data;
            }else {
                toastMessage(data.error, "error");
                return {};
            }
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    const giveStudentMarks = async (assignmentID: string, studentID: string, studentAnswer: string, correctAnswer: string) => {
        try {
            const res = await fetch(`${url}/api/flask/getmarks/`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("auth-token")!,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({studentID, assignmentID, studentAnswer, correctAnswer})
            });
            const data = await res.json();
            if (data.success) {
                return true;
            }else {
                // toastMessage(data.error, "error");
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const checkPlagarism = async (assignmentID: string, studentIDs: [string], answers: [string]) => {

        try{
            const res = await fetch(`${url}/api/flask/checkplagarism/`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("auth-token")!,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({assignmentID, studentIDs, answers})
            });
            const data = await res.json();
            if (data.success) {
                toastMessage("An assignment plagarism test has completed", "success");
                return data;
            }else {
                await checkPlagarism(assignmentID, studentIDs, answers);
            }
        }
        catch(err){
            console.log(err);
            await checkPlagarism(assignmentID, studentIDs, answers);
        }

    }




    return (
        <StudentContext.Provider value={{toastMessage, getMyClassrooms, getMyAssignments, checkPlagarism, getStudent, giveStudentMarks}}>
        {props.children}
        </StudentContext.Provider>
    )
}

export default StudentContext;
export {StudentState};