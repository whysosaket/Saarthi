import {createContext, useEffect, useState} from "react";
const ClassroomContext = createContext<any>({});
import { toast } from "react-toastify";

let url = import.meta.env.VITE_URL;

const ClassroomState = (props: any) => {

    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };

    useEffect(() => {
     
    },[]);





    return (
        <ClassroomContext.Provider value={{toastMessage}}>
        {props.children}
        </ClassroomContext.Provider>
    )
}

export default ClassroomContext;
export {ClassroomState};