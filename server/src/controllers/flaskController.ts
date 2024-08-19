import dotenv from "dotenv";
dotenv.config();

import { Request, Response } from "express";
// import { feedback } from "../dev/data";

import StudentAssignment from "../models/StudentAssignment";
const NGROK_URL = process.env.NGROK as string;

const textToCharArray = (inputText: string) => {
  const arrayOfStrings = inputText.split("\\n");
  const filteredArray = arrayOfStrings.filter((str) => str.trim() !== "");
  return filteredArray;
};

const checkPlagarism = async (req: Request, res: Response) => {
  const { assignmentID, answers, studentIDs } = req.body;
  try {
    const resp = await fetch(`${NGROK_URL}/check_plag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ links: answers }),
    });

    const data = await resp.json();

    let assignments = await StudentAssignment.find({
      assignment: assignmentID,
      student: { $in: studentIDs },
    });

    // update the plagarism status of the student assignment
    for (let i = 0; i < assignments.length; i++) {
      assignments[i].plagarism = data[i].Copied == "True" ? true : false;
      assignments[i].plagarismChance = (1 - data[i].Plagiarised) * 1000;
      assignments[i].aiProbability = (1 - data[i].AI_Gen) * 1000;
      // @ts-ignore
      if (assignments[i].aiProbability > 100) {
        assignments[i].aiProbability = 0;
      }
      await assignments[i].save();
    }

    return res.json({ success: true, info: "Plagarism Checked" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getMarks = async (req: Request, res: Response) => {
  const { assignmentID, studentID, studentAnswer, correctAnswer } = req.body;

  try {
    let assignment = await StudentAssignment.findOne({
      assignment: assignmentID,
      student: studentID,
    });
    if (!assignment)
      return res.status(400).json({ error: "Student not found" });

    // if the student has already been graded, return error
    // @ts-ignore
    if (assignment.grade > 0) return res.status(200).json({ success: true });
    else {
      assignment.status = "Under Review";
      await assignment.save();
    }

    console.log("fetching from flask");

    const resp = await fetch(`${NGROK_URL}/mark_answer_sub`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        students_ans: studentAnswer,
        teachers_ans: correctAnswer,
        min_marks: 0,
        max_marks: 100,
      }),
    });

    const data = await resp.json();

    assignment = await StudentAssignment.findOne({
      assignment: assignmentID,
      student: studentID,
    });
    if (!assignment)
      return res.status(400).json({ error: "Student not found" });
    // @ts-ignore
    if (assignment.grade > 0) return res.status(200).json({ success: true });

    assignment.grade = data.marks / 10;
    assignment.status = "graded";
    await assignment.save();

    return res.json({ success: true, info: "Marks Updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
/*
const getAIfeedback = async (req: Request, res: Response) => {
  let { assignmentID, answer } = req.body;
  try {
    let assignment = await StudentAssignment.findById(assignmentID);

    if (!assignment)
      return res.status(400).json({ error: "Assignment not found" });

    const resp = await fetch(`${NGROK_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ students_ans: answer }),
    });

    const data = await resp.json();

    // add this data to the student assignment
    let newFeedback = textToCharArray(data.result);
    if (!assignment.feedback) assignment.feedback = newFeedback;
    else assignment.feedback = [...assignment.feedback, ...newFeedback];

    await assignment.save();

    return res.json({ success: true, info: "Feedback Updated" });
  } catch (error) {
    try {
      let newFeedback = textToCharArray(feedback.result);
      let assignment = await StudentAssignment.findById(assignmentID);

      if (!assignment)
        return res.status(400).json({ error: "Assignment not found" });

      if (!assignment.feedback) assignment.feedback = newFeedback;
      else assignment.feedback = [...assignment.feedback, ...newFeedback];

      await assignment.save();
      return res.json({ success: true, info: "Feedback Updated Via Cache" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
*/

// export { checkPlagarism, getMarks, getAIfeedback };
export { checkPlagarism, getMarks};
