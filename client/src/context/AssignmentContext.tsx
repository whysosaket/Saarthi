import { createContext, useEffect, useState } from "react";
const AssignmentContext = createContext<any>({});
import { toast } from "react-toastify";

let url = import.meta.env.VITE_URL;

const AssignmentState = (props: any) => {
  const toastMessage = (message: string, type: string) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };

  const [questionLink, setQuestionLink] = useState("");
  const [answerLink, setAnswerLink] = useState("");

  useEffect(() => {}, []);

  const getAllAssignments = async () => {
    try {
      const res = await fetch(`${url}/api/assignments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
      const data = await res.json();
      if (data.success) {
        return data.assignments;
      } else {
        toastMessage(data.error, "error");
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const handlePostUpload = (question: string, answer: string) => {
    setQuestionLink(question);
    setAnswerLink(answer);
  };

  const createAssignment = async (
    name: string,
    classroom: string,
    description: string,
    dueDate: string
  ) => {
    try {
      const res = await fetch(`${url}/api/assignment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({
          assignmentName: name,
          classroomID: classroom,
          description,
          dueDate,
          questions: questionLink,
          answers: answerLink,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toastMessage("Assignment created successfully", "success");
        handlePostUpload("", "");
        return true;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getAssignment = async (assignmentID: string) => {
    try {
      const res = await fetch(`${url}/api/assignment/${assignmentID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
      const data = await res.json();
      if (data.success) {
        return data.assignment;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const submitAssignment = async (assignmentId: string, answer: string) => {
    try {
      const res = await fetch(`${url}/api/assignment/addstudentassignment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({ assignmentId, answer }),
      });
      const data = await res.json();
      if (data.success) {
        toastMessage("Assignment submitted successfully", "success");
        return true;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getSubmittedAssignments = async (assignmentId: string) => {
    try {
      const res = await fetch(
        `${url}/api/assignment/submitted/${assignmentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token") || "",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        return data.submissions;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const deleteAssignment = async (assignmentId: string) => {
    try {
      const res = await fetch(`${url}/api/assignment/delete/${assignmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
      const data = await res.json();
      if (data.success) {
        toastMessage("Assignment deleted successfully", "success");
        return true;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getSubmittedAssignmentReport = async (assignmentId: string) => {
    try {
      const res = await fetch(`${url}/api/assignment/report/${assignmentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
      const data = await res.json();
      if (data.success) {
        return data;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const updateGrade = async (assignmentID: string, grade: number) => {
    try {
      const res = await fetch(`${url}/api/assignment/grade/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({ assignmentID, grade }),
      });
      const data = await res.json();
      if (data.success) {
        toastMessage("Grade updated successfully", "success");
        return true;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const sendFeedback = async (assignmentID: string, feedback: string) => {
    try {
      const res = await fetch(`${url}/api/assignment/feedback/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({ assignmentID, feedback }),
      });
      const data = await res.json();
      if (data.success) {
        toastMessage("Feedback sent successfully", "success");
        return true;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getSubmissions = async (assignmentID: string) => {
    try {
      const res = await fetch(`${url}/api/student/assignment/${assignmentID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });
      const data = await res.json();
      if (data.success) {
        return data.assignment;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const raiseDispute = async (assignmentID: string, dispute: string) => {
    try {
      const res = await fetch(`${url}/api/assignment/dispute/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({ assignmentID, message: dispute }),
      });
      const data = await res.json();
      if (data.success) {
        toastMessage("Dispute raised successfully", "success");
        return true;
      } else {
        toastMessage(data.error, "error");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  const getAIfeedback = async (assignmentID: string, answer: string) => {
    try {
      const res = await fetch(`${url}/api/flask/getaifeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
        body: JSON.stringify({ assignmentID, answer })
      });
      const data = await res.json();
      if (data.success) {
        toastMessage("AI feedback received successfully", "success");
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }


  return (
    <AssignmentContext.Provider
      value={{
        toastMessage,
        deleteAssignment,
        getSubmissions,
        sendFeedback,
        updateGrade,
        getSubmittedAssignmentReport,
        getAssignment,
        submitAssignment,
        getSubmittedAssignments,
        getAllAssignments,
        questionLink,
        answerLink,
        handlePostUpload,
        createAssignment,
        raiseDispute,
        getAIfeedback
      }}
    >
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentContext;
export { AssignmentState };
