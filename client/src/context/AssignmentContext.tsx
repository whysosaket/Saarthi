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





    return (
        <AssignmentContext.Provider value={{toastMessage, getAllAssignments}}>
        {props.children}
        </AssignmentContext.Provider>
    )
}

export default AssignmentContext;
export {AssignmentState};