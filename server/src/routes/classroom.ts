import { Router, Response } from "express";

import { createClassroom, joinClassroom, getClassroomStudents, getTeacherClassrooms, getClassroomInfo } from "../controllers/classroomController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/classroom/create").post(fetchuser, (req: any, res: Response)=>createClassroom(req, res));
    router.route("/api/classroom/join").post(fetchuser, (req: any, res: Response)=>joinClassroom(req, res));
    router.route("/api/classroom/students/:classroomID").get(fetchuser, (req: any, res: Response)=>getClassroomStudents(req, res));
    router.route("/api/classroom").get(fetchuser, (req: any, res: Response)=>getTeacherClassrooms(req, res));
    router.route("/api/classroom/:classroomID").get(fetchuser, (req: any, res: Response)=>getClassroomInfo(req, res));
}