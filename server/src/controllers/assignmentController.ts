import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Classroom from "../models/Classroom";
import Assignment from "../models/Assignment";
import StudentAssignment from "../models/StudentAssignment";
import CustomRequest from "../types/CustomRequest";

import { generateRandomString } from "../utils/UserHelper";


const createAssignment = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    // Saving req data into a variable
    let data = req.body;
    
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        // check if classroom exists
        let classroom = await Classroom.findOne({ classRoomId: data.classroomID });
        if (!classroom) {
            return res.status(400).json({ success, error: "Classroom not found!" });
        }

        // check if teacher is the owner of the classroom
        if (String(classroom.teacherId._id) !== req.user.id) {
            return res.status(400).json({ success, error: "You are not the owner of this classroom!" });
        }

        // generate random string for assignment ID
        let assignmentID = generateRandomString(10);

        // check if assignment ID already exists
        let assignment = await Assignment.findOne({ assignmentId: assignmentID });
        while (assignment) {
            assignmentID = generateRandomString(10);
            assignment = await Assignment.findOne({ assignmentId: assignmentID });
        }

        // create new assignment
        let newAssignment = new Assignment({
            teacherId: req.user.id,
            classRoomId: classroom._id,
            assignmentId: assignmentID,
            assignmentName: data.assignmentName,
            description: data.description,
            dueDate: data.dueDate,
            assignedDate: new Date(),
            questions: data.questions
        });

        // save the assignment
        await newAssignment.save();

        // add assignment to classroom
        classroom.assignments.push(newAssignment._id);
        await classroom.save();

        success = true;
        return res.json({ success, assignment: assignmentID, info: "Assignment created successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

const addStudentsToAssignment = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    // Saving req data into a variable
    let data = req.body;
    
    try {
        // check if user exists
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        // check if assignment exists

        let assignment = await Assignment.findOne({ assignmentId: data.assignmentId });
        if (!assignment) {
            return res.status(400).json({ success, error: "Assignment not found!" });
        }

        // check if teacher is the owner of the assignment
        if (String(assignment.teacherId) !== req.user.id) {
            return res.status(400).json({ success, error: "You are not the owner of this assignment!" });
        }

        // check if classroom exists
        let classroom = await Classroom.findOne({ classRoomId: data.classroomID });

        if (!classroom) {
            return res.status(400).json({ success, error: "Classroom not found!" });
        }

        // check if assignment is in the classroom
        if (!classroom.assignments.includes(assignment._id)) {
            return res.status(400).json({ success, error: "Assignment not in the classroom!" });
        }

        // add students to assignment
        for (let i = 0; i < data.studentIds.length; i++) {
            let student = await User.findById(data.studentIDs[i]);
            if (!student) {
                return res.status(400).json({ success, error: "Student not found!" });
            }

            let studentAssignment = new StudentAssignment({
                studentId: data.studentIDs[i],
                assignmentId: assignment.assignmentId,
                classroomId: classroom._id,
                grade: 0
            });

            await studentAssignment.save();
        }

        success = true;
        return res.json({ success, info: "Students added to assignment!" });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

const getAssignment = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    // Saving req data into a variable
    let data = req.params;
    
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        // check if assignment exists
        let assignment = await Assignment.findOne({ assignmentId: data.assignmentID });
        if (!assignment) {
            return res.status(400).json({ success, error: "Assignment not found!" });
        }

        // check if student is adder to assignment or teacher is the owner of the assignment
        if (String(assignment.teacherId) !== req.user.id) {
            let std = await User.findOne({ studentId: req.user.id, assignmentId: data.assignmentId });
            let tch = await User.findOne({ teacherId: req.user.id, assignmentId: data.assignmentId });

            if (!std && !tch) {
                return res.status(400).json({ success, error: "You are not the owner of this assignment!" });
            }
        }

        success = true;
        return res.json({ success, assignment });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

export { createAssignment, addStudentsToAssignment, getAssignment };