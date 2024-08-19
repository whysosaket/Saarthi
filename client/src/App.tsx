import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import _404 from "./pages/_404";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DynamicBackground from "./components/DynamicBackground";

import { GlobalState } from "./context/GlobalContext";
import Dashboard from "./pages/Dashboard";
import { ClassroomState } from "./context/ClassroomContext";
import { AssignmentState } from "./context/AssignmentContext";
import Join from "./pages/Join";
import StudentDashboard from "./pages/StudentDashboard";
import { StudentState } from "./context/StudentContext";
import StudentAssignmentReport from "./pages/StudentAssignmentReport";
import GradeBook from "./pages/GradeBook";


function App() {
  return (
    <>
      <DynamicBackground />
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        theme="dark"
        closeOnClick
        rtl={false}
        pauseOnHover
        limit={2}
      />
      <GlobalState>
        <ClassroomState>
          <StudentState>
          <AssignmentState>
        <Router>
          <Navbar />
          <div className="mt-16 bg-transparent font-inter"> </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assignment/:id" element={<Dashboard />} />
            <Route path="/studentdashboard" element={<StudentDashboard />} />
            <Route path="/submit/:id" element={<StudentDashboard/>} />
            <Route path="/assignmentreport/:id" element={<Dashboard />} />
            <Route path="/studentassignmentreport/:id" element={<StudentDashboard />} />
            <Route path="/gradebook/:id" element={<Dashboard />} />
            <Route path="/join">
              <Route path="" element={<Join />} />
              <Route path=":id" element={<Join />} />
            </Route>
            <Route path="*" element={<_404 />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
          </AssignmentState>
          </StudentState>
        </ClassroomState>
      </GlobalState>
    </>
  );
}

export default App;
