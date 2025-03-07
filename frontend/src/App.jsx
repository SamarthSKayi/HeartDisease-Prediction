import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Heart from "./components/Heart";
import Home from "./components/Home";

export default function App() {
  return (
    <Router>
      <div className="w-screen h-screen flex flex-col bg-black text-white">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heart-disease" element={<Heart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
