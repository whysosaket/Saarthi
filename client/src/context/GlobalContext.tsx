import {createContext, useEffect, useState} from "react";
const GlobalContext = createContext<any>({});
import { toast } from "react-toastify";
let url = import.meta.env.VITE_URL;

const items = ["classrooms", "createClassrooms", "assignments", "classroom", "assignment", "createAssignments", "assignmentReport", "uploadAssignment", "viewAssignment", "gradeBook"];
const studentItems = ["classrooms", "assignments", "classroom", "assignment", "uploadAssignment", "viewAssignment", "assignmentReport"];

const GlobalState = (props: any) => {

    const [progress, setProgress] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeComponent, setActiveComponent] = useState("classrooms");
    const [activeClassroom, setActiveClassroom] = useState("");


    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };

    const handleComponentChange = (component: string) => {
        if (items.includes(component) || studentItems.includes(component)) {
            console.log("changing component to ", component);
            setActiveComponent(component);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            setIsAuthenticated(true);
        }
    },[]);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${url}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (data.success) {
                localStorage.setItem("auth-token", data.authtoken);
                toastMessage("Logged in successfully", "success");
                setIsAuthenticated(true);
                return true
            } else {
                toastMessage(data.error, "error");
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const signup = async (name: string, email: string, password: string) => {
        try {
            const res = await fetch(`${url}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (data.success) {
                toastMessage("Signup successful", "success");
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


    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        setIsAuthenticated(false);
    }





    return (
        <GlobalContext.Provider value={{toastMessage, handleComponentChange,setActiveClassroom,activeClassroom, activeComponent, progress, setProgress, login, signup, isAuthenticated, handleLogout, studentItems}}>
        {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;
export {GlobalState};