import {createContext, useEffect, useState} from "react";
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





    return (
        <StudentContext.Provider value={{toastMessage, getMyClassrooms, getMyAssignments}}>
        {props.children}
        </StudentContext.Provider>
    )
}

export default StudentContext;
export {StudentState};