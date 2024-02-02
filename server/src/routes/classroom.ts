import { Router, Response } from "express";

import { createClassroom, joinClassroom, getClassroomStudents, getTeacherClassrooms, getClassroomInfo, deleteClassroom, removeStudentFromClassroom } from "../controllers/classroomController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/classroom/create").post(fetchuser, (req: any, res: Response)=>createClassroom(req, res));
    router.route("/api/classroom/join/:classroomID").post(fetchuser, (req: any, res: Response)=>joinClassroom(req, res));
    router.route("/api/classroom/students/:classroomID").get(fetchuser, (req: any, res: Response)=>getClassroomStudents(req, res));
    router.route("/api/classroom").get(fetchuser, (req: any, res: Response)=>getTeacherClassrooms(req, res));
    router.route("/api/classroom/:classroomID").get(fetchuser, (req: any, res: Response)=>getClassroomInfo(req, res));
    router.route("/api/classroom").delete(fetchuser, (req: any, res: Response)=>deleteClassroom(req, res));
    router.route("/api/classroom/removestudent").post(fetchuser, (req: any, res: Response)=>removeStudentFromClassroom(req, res));
}