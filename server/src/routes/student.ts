import {  Response, Router } from "express";
import { getJoinedClassrooms, getMyAssignments } from "../controllers/studentController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/student/classrooms").get(fetchuser, (req: any, res: Response)=>getJoinedClassrooms(req, res));
    router.route("/api/student/assignments").get(fetchuser, (req: any, res: Response)=>getMyAssignments(req, res));
}