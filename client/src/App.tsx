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

function App() {
  return (
    <>
      <DynamicBackground />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        theme="dark"
        closeOnClick
        rtl={false}
        pauseOnHover
        limit={2}
      />
      <GlobalState>
        <Router>
          <Navbar />
          <div className="mt-16 bg-transparent"> </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<_404 />} />
          </Routes>
          <Footer />
        </Router>
      </GlobalState>
    </>
  );
}

export default App;
