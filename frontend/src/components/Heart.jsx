import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";
import heartImage from "../assets/heart.jpg";

export default function Heart() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPain: "",
    bp: "",
    cholesterol: "",
    fbs: "",
    ekg: "",
    maxHR: "",
    exerciseAngina: "",
    stDepression: "",
    slopeST: "",
    vessels: "",
    thallium: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    // Map frontend keys to match backend keys
    const formattedData = {
      Age: parseInt(formData.age),
      Sex: parseInt(formData.sex),
      "Chest pain type": parseInt(formData.chestPain),
      BP: parseInt(formData.bp),
      Cholesterol: parseInt(formData.cholesterol),
      "FBS over 120": parseInt(formData.fbs),
      "EKG results": parseInt(formData.ekg),
      "Max HR": parseInt(formData.maxHR),
      "Exercise angina": parseInt(formData.exerciseAngina),
      "ST depression": parseFloat(formData.stDepression),
      "Slope of ST": parseInt(formData.slopeST),
      "Number of vessels fluro": parseInt(formData.vessels),
      Thallium: parseInt(formData.thallium),
    };

    console.log("Sending Data to API:", formattedData); // Debugging

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.prediction);
      }
    } catch (err) {
      setError("Error fetching prediction. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-10 bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800 px-4">
      <div className="relative w-full max-w-6xl mb-12 flex flex-col items-center">
        <motion.div
          className="relative w-full bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center border border-gray-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-6 w-72 h-72 flex items-center justify-center">
            <motion.img
              src={heartImage}
              alt="Heart Health"
              className="w-72 h-72 object-cover rounded-xl shadow-md border-4 border-gray-300"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <h2 className="text-5xl font-extrabold text-blue-700 text-center">
            Heart Disease Prediction
          </h2>
          <p className="text-lg mt-3 text-center text-gray-600">
            Enter your details to analyze your heart health risk.
          </p>
        </motion.div>
      </div>

      <Card className="w-full max-w-6xl bg-white p-14 rounded-3xl shadow-2xl border border-gray-200">
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-8">
            {[
              { label: "Age", name: "age", min: 1, max: 120 },
              { label: "Blood Pressure", name: "bp", min: 50, max: 250 },
              { label: "Cholesterol", name: "cholesterol", min: 100, max: 600 },
              { label: "Max Heart Rate", name: "maxHR", min: 60, max: 220 },
              { label: "ST Depression", name: "stDepression", min: 0, max: 6, step: "0.1" },
              { label: "Slope of ST", name: "slopeST", min: 0, max: 2 },
              { label: "Number of Vessels Fluro", name: "vessels", min: 0, max: 3 },
              { label: "Thallium", name: "thallium", min: 0, max: 3 },
            ].map(({ label, name, min, max, step }) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium text-lg">{label}:</label>
                <input
                  type="number"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  min={min}
                  max={max}
                  step={step || "1"}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                />
              </div>
            ))}

            {[
              { label: "Sex", name: "sex", options: ["Male", "Female"] },
              { label: "Chest Pain Type", name: "chestPain", options: ["0", "1", "2", "3", "4"] },
              { label: "FBS Over 120", name: "fbs", options: ["No", "Yes"] },
              { label: "EKG Results", name: "ekg", options: ["Normal", "Abnormal"] },
              { label: "Exercise Angina", name: "exerciseAngina", options: ["No", "Yes"] },
            ].map(({ label, name, options }) => (
              <div key={name}>
                <label className="block text-gray-700 font-medium text-lg">{label}:</label>
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 text-lg"
                >
                  <option value="">Select</option>
                  {options.map((option, index) => (
                    <option key={index} value={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="col-span-3 flex justify-center mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-12 py-4 text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Predict
              </motion.button>
            </div>
          </form>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 p-6 text-center rounded-lg text-lg font-semibold text-white"
              style={{ backgroundColor: result === "Disease Present" ? "#d60000" : "#006400" }}
            >
              {result}
            </motion.div>
          )}

          {error && <p className="mt-4 text-red-600">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
