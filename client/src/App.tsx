import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import _404 from "./pages/_404";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DynamicBackground from "./components/DynamicBackground";


function App() {

  return (
    <>
      <DynamicBackground />
       <Router>
      <Navbar />
      <div className="mt-16">{" "}</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<_404 />} />
      </Routes>
      <Footer />
      </Router>
    </>
  )
}

export default App
