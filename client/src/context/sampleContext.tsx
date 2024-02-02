import {createContext, useEffect, useState} from "react";
const SampleContext = createContext<any>({});
import { toast } from "react-toastify";

let url = import.meta.env.VITE_URL;

const SampleState = (props: any) => {

    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };

    useEffect(() => {
     
    },[]);





    return (
        <SampleContext.Provider value={{toastMessage}}>
        {props.children}
        </SampleContext.Provider>
    )
}

export default SampleContext;
export {SampleState};