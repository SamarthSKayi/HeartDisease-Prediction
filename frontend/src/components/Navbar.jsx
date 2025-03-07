import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react"; 

export default function Navbar() {
  const diseases = [
    { name: "Heart Disease", path: "/heart-disease" },
    { name: "Breast Cancer", path: "/breast-cancer" },
    { name: "Diabetes", path: "/diabetes" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const navigate = useNavigate();

  // Handle Search Input Change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredDiseases([]);
    } else {
      setFilteredDiseases(
        diseases.filter((disease) =>
          disease.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  // Navigate when a disease is clicked
  const handleSelectDisease = (path) => {
    setSearchTerm("");  // Clear search bar
    setFilteredDiseases([]);
    navigate(path);
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md relative">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-blue-700">
        Disease Predictor
      </Link>

      {/* Search Bar */}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search diseases..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 w-72 pl-10 text-gray-800 bg-white rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <Search className="absolute left-3 text-gray-500 w-5 h-5" />

        {/* Search Results Dropdown */}
        {filteredDiseases.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden text-gray-800"
          >
            {filteredDiseases.map((disease, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer transition"
                onClick={() => handleSelectDisease(disease.path)}
              >
                {disease.name}
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-lg">
        <li>
          <Link 
            to="/" 
            className="text-gray-800 hover:text-blue-600 transition"
          >
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}
