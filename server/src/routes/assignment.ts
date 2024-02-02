import {  Response, Router } from "express";
import { createAssignment, addStudentsToAssignment, getAssignment } from "../controllers/assignmentController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/assignment/create").post(fetchuser, (req: any, res: Response)=>createAssignment(req, res));
    router.route("/api/assignment/addstudents").post(fetchuser, (req: any, res: Response)=>addStudentsToAssignment(req, res));
    router.route("/api/assignment/:assignmentID").get(fetchuser, (req: any, res: Response)=>getAssignment(req, res));
}