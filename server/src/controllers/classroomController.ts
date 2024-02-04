import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";

import User from "../models/User";
import Classroom from "../models/Classroom";
import CustomRequest from "../types/CustomRequest";

import { generateRandomString } from "../utils/UserHelper";
import StudentAssignment from "../models/StudentAssignment";

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
};

const getTeacherClassrooms = async (req: CustomRequest, res: Response) => {
  let success = false;

  try {
    // check if user exists
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ success, error: "User not found!" });
    }

    // get teacher's classrooms
    let classrooms = await Classroom.find({ teacherId: req.user.id });

    success = true;
    return res.json({ success, classrooms });
  } catch (error) {
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const joinClassroom = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let data = req.params;

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

    // check if user is the teacher of the classroom
    if (String(classroom.teacherId._id) == String(user._id)) {
      return res
        .status(400)
        .json({ success, error: "User is the teacher of the classroom!" });
    }

    // check if user is already in the classroom
    if (classroom.studentIds.includes(user._id)) {
      return res
        .status(400)
        .json({ success, error: "User already in the classroom!" });
    }

    // add user to classroom
    classroom.studentIds.push(user._id);
    await classroom.save();

    success = true;

    return res.json({
      success,
      classroom: classroom.classRoomId,
      info: "User added to classroom!",
    });
  } catch (error) {
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const getClassroomStudents = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let data = req.params;
  try {
    // check if user exists
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ success, error: "User not found!" });
    }

    let classroomID = data.classroomID;
    let classroom = await Classroom.findOne({ classRoomId: classroomID });
    if (!classroom) {
      return res.status(400).json({ success, error: "Classroom not found!" });
    }

    // check if user is the teacher of the classroom
    if (String(classroom.teacherId._id) != String(user._id)) {
      return res
        .status(400)
        .json({ success, error: "User is not the teacher of the classroom!" });
    }

    // get students in the classroom
    let students = await User.find(
      { _id: { $in: classroom.studentIds } },
      "name email studentId"
    );

    success = true;
    return res.json({ success, students });
  } catch (error) {
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const getClassroomInfo = async (req: CustomRequest, res: Response) => {
  let success = false;

  // Saving req data into a variable
  let data = req.params;
  try {
    // check if user exists
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ success, error: "User not found!" });
    }

    let classroomID = data.classroomID;
    let classroom = await Classroom.findOne({ classRoomId: classroomID })
      .populate("teacherId", "name email")
      .populate("studentIds", "name email studentId");

    if (!classroom) {
      return res.status(400).json({ success, error: "Classroom not found!" });
    }

    success = true;
    return res.json({ success, classroom });
  } catch (error) {
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const deleteClassroom = async (req: CustomRequest, res: Response) => {
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
    let classroom = await Classroom.findOne({ classRoomId: classroomID });

    if (!classroom) {
      return res.status(400).json({ success, error: "Classroom not found!" });
    }

    // check if user is the teacher of the classroom
    if (String(classroom.teacherId._id) != String(user._id)) {
      return res
        .status(400)
        .json({ success, error: "User is not the teacher of the classroom!" });
    }

    // delete the classroom
    await Classroom.deleteOne({ classRoomId: classroomID });

    success = true;
    return res.json({ success, info: "Classroom deleted!" });
  } catch (error) {
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const removeStudentFromClassroom = async (
  req: CustomRequest,
  res: Response
) => {
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
    let classroom = await Classroom.findOne({ classRoomId: classroomID });

    if (!classroom) {
      return res.status(400).json({ success, error: "Classroom not found!" });
    }

    // check if user is the teacher of the classroom
    if (String(classroom.teacherId._id) != String(user._id)) {
      return res
        .status(400)
        .json({ success, error: "User is not the teacher of the classroom!" });
    }

    // check if student exists
    let student: any = await User.findOne({ studentId: data.studentID });
    if (!student) {
      return res.status(400).json({ success, error: "Student not found!" });
    }

    // check if student is in the classroom
    if (!classroom.studentIds.includes(student._id)) {
      return res
        .status(400)
        .json({ success, error: "Student not in the classroom!" });
    }

    // remove student from classroom
    classroom.studentIds = classroom.studentIds.filter(
      (id) => String(id) != String(student._id)
    );
    await classroom.save();

    success = true;
    return res.json({ success, info: "Student removed from classroom!" });
  } catch (error) {
    return res.status(500).json({ success, error: "Internal Server Error!" });
  }
};

const getClassroomAssignments = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    // Saving req data into a variable
    let data = req.params;
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        let classroomID = data.classroomID;
        let classroom = await Classroom
            .findOne({ classRoomId: classroomID }).sort({ assignedDate: -1 })
            .populate('assignments');

        if (!classroom) {
            return res.status(400).json({ success, error: "Classroom not found!" });
        }

        success = true;
        return res.json({ success, assignments: classroom.assignments });
    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

const getGradeBook = async (req: CustomRequest, res: Response) => {
    let success = false;
    
    // Saving req data into a variable
    let {classroomID} = req.params;
    try {
        // check if user exists
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ success, error: "User not found!" });
        }

        let classroom = await Classroom
            .findOne({ classRoomId: classroomID })
            .populate('assignments');
        
        if (!classroom) {
            return res.status(400).json({ success, error: "Classroom not found!" });
        }

        // console.log(classroom.assignments);
        let totalAverageGrade = 0;
        let submissionRatio = 0;
        let assignmentAverageGrade = [];
        let assignmentSubmissionRatio = [];

        for (let i = 0; i < classroom.assignments.length; i++) {
            let assignment = classroom.assignments[i];
            let totalGrade = 0;
            let totalSubmissions = 0;
            // @ts-ignore
            for (let j = 0; j < assignment.submissions.length; j++) {
                // @ts-ignore
                let studentAssignment = await StudentAssignment.findById(assignment.submissions[j]);
                // @ts-ignore
                if (studentAssignment.status == 'graded') {
                    // @ts-ignore
                    totalGrade += studentAssignment.grade;
                    totalSubmissions++;
                }
            }

            // @ts-ignore
            assignmentAverageGrade.push({assignment: assignment.assignmentName, averageGrade: totalGrade / totalSubmissions});
            // @ts-ignore
            assignmentSubmissionRatio.push({assignment: assignment.assignmentName, submissionRatio: totalSubmissions / classroom.studentIds.length});
        }

        for (let i = 0; i < assignmentAverageGrade.length; i++) {
            totalAverageGrade += assignmentAverageGrade[i].averageGrade;
        }

        totalAverageGrade = totalAverageGrade / assignmentAverageGrade.length;

        for (let i = 0; i < assignmentSubmissionRatio.length; i++) {
            submissionRatio += assignmentSubmissionRatio[i].submissionRatio;
        }

        submissionRatio = submissionRatio / assignmentSubmissionRatio.length;

        success = true;
        return res.json({ success, totalAverageGrade, submissionRatio, assignmentAverageGrade, assignmentSubmissionRatio });

    } catch (error) {
        return res.status(500).json({ success, error: "Internal Server Error!" });
    }
}

export {
  createClassroom,
  joinClassroom,
  getClassroomStudents,
  getTeacherClassrooms,
  getClassroomInfo,
  deleteClassroom,
  removeStudentFromClassroom,
  getClassroomAssignments,
  getGradeBook
};
