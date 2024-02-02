import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Classroom from "../models/Classroom";
import CustomRequest from "../types/CustomRequest";

import { generateRandomString } from "../utils/UserHelper";

const createClassroom = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    // Saving req data into a variable
    let data = req.body;
    
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        // generate a random string for classroom ID
        let classroomID = generateRandomString(10);

        // check if classroom ID already exists
        let classroomIDExists = await User.findOne({ classroomId: classroomID });

        while (classroomIDExists) {
            classroomID = generateRandomString(10);
            classroomIDExists = await User.findOne({ classroomId: classroomID });
        }

        // create new classroom
        let newClassroom = new Classroom({
            teacherId: req.user.id,
            classRoomId: classroomID,
            className: data.name,
            subject: data.subject,
            description: data.description,
        });

        // save the classroom
        await newClassroom.save();

        success = true;
        return res.json({ success, classroom: newClassroom.classRoomId });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}


const joinClassroom = async (req: CustomRequest, res: Response) => {
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
        let classroom = await Classroom.findOne({ classroomId: data.classroomID });
        if (!classroom) {
            return res.status(400).json({ success, error: "Classroom not found!" });
        }

        // check if user is the teacher of the classroom
        if (String(classroom.teacherId._id) == String(user._id)) {
            return res.status(400).json({ success, error: "User is the teacher of the classroom!" });
        }

        // check if user is already in the classroom
        if (classroom.studentIds.includes(user._id)) {
            return res.status(400).json({ success, error: "User already in the classroom!" });
        }

        // add user to classroom
        classroom.studentIds.push(user._id);
        await classroom.save();

        success = true;

        return res.json({ success, classroom: classroom.classRoomId, info: "User added to classroom!"});
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

const getClassroomStudents = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    // Saving req data into a variable
    let data = req.body;
    
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        let classroomID = data.classroomID;
        let classroom = await Classroom.findOne({ classroomId: classroomID });
        if (!classroom) {
            return res.status(400).json({ success, error: "Classroom not found!" });
        }

        // check if user is the teacher of the classroom
        if (String(classroom.teacherId._id) != String(user._id)) {
            return res.status(400).json({ success, error: "User is not the teacher of the classroom!" });
        }

        // get students in the classroom
        let students = await User.find({ _id: { $in: classroom.studentIds } }, "name email studentId");

        success = true;
        return res.json({ success, students });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

export { createClassroom, joinClassroom, getClassroomStudents };