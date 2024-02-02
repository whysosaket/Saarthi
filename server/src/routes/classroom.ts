import { Router, Response } from "express";

import { createClassroom, joinClassroom, getClassroomStudents } from "../controllers/classroomController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/classroom/create").post(fetchuser, (req: any, res: Response)=>createClassroom(req, res));
    router.route("/api/classroom/join").post(fetchuser, (req: any, res: Response)=>joinClassroom(req, res));
    router.route("/api/classroom/students").get(fetchuser, (req: any, res: Response)=>getClassroomStudents(req, res));
}