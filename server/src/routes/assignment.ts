import {  Response, Router } from "express";
import { createAssignment, addStudentsToAssignment, getAssignment, getAllAssignments, addStudentAssignment, deleteAssignment, getSubmittedAssignments } from "../controllers/assignmentController";
import fetchuser from "../middleware/fetchuser";

export default (router: Router) => {
    router.route("/api/assignment/create").post(fetchuser, (req: any, res: Response)=>createAssignment(req, res));
    router.route("/api/assignment/addstudents").post(fetchuser, (req: any, res: Response)=>addStudentsToAssignment(req, res));
    router.route("/api/assignment/:assignmentID").get(fetchuser, (req: any, res: Response)=>getAssignment(req, res));
    router.route("/api/assignments").get(fetchuser, (req: any, res: Response)=>getAllAssignments(req, res));
    router.route("/api/assignment/addstudentassignment").post(fetchuser, (req: any, res: Response)=>addStudentAssignment(req, res));
    router.route("/api/assignment/delete/:assignmentID").delete(fetchuser, (req: any, res: Response)=>deleteAssignment(req, res));
    router.route("/api/assignment/submitted/:assignmentID").get(fetchuser, (req: any, res: Response)=>getSubmittedAssignments(req, res));
}