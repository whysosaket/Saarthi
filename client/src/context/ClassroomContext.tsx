import {createContext, useEffect} from "react";
const ClassroomContext = createContext<any>({});
import { toast } from "react-toastify";

let url = import.meta.env.VITE_URL;
let clientUrl = import.meta.env.VITE_CLIENT_URL;

const ClassroomState = (props: any) => {

    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };

    useEffect(() => {
     
    },[]);

    const createClassroom = async (name: string, subject: string,  description: string) => {
        try {
            const res = await fetch(`${url}/api/classroom/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
                body: JSON.stringify({ name, subject, description }),
            });
            const data = await res.json();
            if (data.success) {
                toastMessage("Classroom created successfully", "success");
                let joiningUrl = `${clientUrl}/join/${data.classroom}`;
                return joiningUrl;
            } else {
                toastMessage(data.error, "error");
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const getAllClassrooms = async () => {
        try {
            const res = await fetch(`${url}/api/classroom`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
            });
            const data = await res.json();
            if (data.success) {
                return data.classrooms;
            } else {
                toastMessage(data.error, "error");
                return [];
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    const getAllStudents = async (classroomId: string) => {
        try {
            const res = await fetch(`${url}/api/classroom/students/${classroomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
            });
            const data = await res.json();
            if (data.success) {
                return data.data;
            } else {
                toastMessage(data.error, "error");
                return [];
            }
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    const getClassroomInfo = async (classroomId: string) => {
        try {
            const res = await fetch(`${url}/api/classroom/${classroomId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
            });
            const data = await res.json();
            if (data.success) {
                return data.classroom;
            } else {
                // toastMessage(data.error, "error");
                return {};
            }
        } catch (err) {
            console.log(err);
            return {};
        }
    }

    const deleteClassroom = async (classroomID: string) => {

        try {
            const res = await fetch(`${url}/api/classroom`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") || ""
                },
                body: JSON.stringify({classroomID})
            });
            const data = await res.json();
            if (data.success) {
                toastMessage("Classroom deleted successfully", "success");
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


    const removeClassroomStudent = async (studentID: string, classroomID: string) => {
            try {
                const res = await fetch(`${url}/api/classroom/removestudent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token") || ""
                    },
                    body: JSON.stringify({classroomID , studentID})
                });
                const data = await res.json();
                if (data.success) {
                    toastMessage("Student removed successfully", "success");
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

        const joinClassroom = async (classroomID: string) => {
            try {
                const res = await fetch(`${url}/api/classroom/join/${classroomID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token") || ""
                    }
                });
                const data = await res.json();
                if (data.success) {
                    toastMessage("Joined classroom successfully", "success");
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

        const getClassroomAssignments = async (classroomID: string) => {
            try {
                const res = await fetch(`${url}/api/classroom/assignments/${classroomID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token") || ""
                    }
                });
                const data = await res.json();
                if (data.success) {
                    return data.assignments;
                } else {
                    return [];
                }
            } catch (err) {
                console.log(err);
                return [];
            }
        }

        const getGradeBook = async (classroomID: string) => {

            try {
                const res = await fetch(`${url}/api/classroom/gradebook/${classroomID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token") || ""
                    }
                });
                const data = await res.json();
                if (data.success) {
                    return data;
                } else {
                    return [];
                }
            } catch (err) {
                console.log(err);
                return [];
            }
        }





    return (
        <ClassroomContext.Provider value={{toastMessage, getGradeBook, createClassroom, getClassroomAssignments, getAllStudents, getClassroomInfo, getAllClassrooms, removeClassroomStudent, deleteClassroom, joinClassroom}}>
        {props.children}
        </ClassroomContext.Provider>
    )
}

export default ClassroomContext;
export {ClassroomState};