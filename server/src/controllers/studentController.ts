import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomRequest from "../types/CustomRequest";
import Classroom from "../models/Classroom";
import Assignment from "../models/Assignment";
import StudentAssignment from "../models/StudentAssignment";

const getJoinedClassrooms = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        // get all classrooms
        let classrooms  = await Classroom.find({ studentIds: { $in: [req.user.id] } });

        success = true;
        return res.json({ success, classrooms });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

const getMyAssignments = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        // get all Classrooms

        let classrooms  = await Classroom.find({ studentIds: { $in: [req.user.id] } });
        let assignmentIDs = classrooms.map((classroom) => classroom.assignments).flat();

        const assignments = await Assignment.find({ _id: { $in: assignmentIDs } }).sort({ assignedDate: -1 });

        success = true;
        return res.json({ success, assignments });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

const getStudent = async (req: CustomRequest, res: Response) => {
    let success = false;

    const { studentID } = req.params;
    
    try {
        // check if user exists
        let user = await User.findById(studentID);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        success = true;
        return res.json({ success, user });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

const getSubmission = async (req: CustomRequest, res: Response) => {
    let success = false;

    let { assignmentID } = req.params;
    
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        let assignment = await StudentAssignment.findOne({ assignment: assignmentID, student: req.user.id });
        if (!assignment) {
            return res.status(200).json({ success: true, assignment: {status: "N/A"} });
        }

        success = true;
        return res.json({ success, assignment });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}
        



export { getJoinedClassrooms, getMyAssignments, getStudent, getSubmission };

        
