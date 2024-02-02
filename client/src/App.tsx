import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"
import Home from "./pages/Home";
import _404 from "./pages/_404";
import Footer from "./components/Footer";


function App() {

  return (
    <>
       <Router>
      <Navbar />
      <div className="mt-16">{" "}</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<_404 />} />
      </Routes>
      <Footer />
      </Router>
    </>
  )
}

export default App
