import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/card";
import { Heart, BrainCircuit, Activity, Eye } from "lucide-react";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 bg-blue-50">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4"
        >
          AI-Powered Disease Prediction
        </motion.h2>
        <p className="text-lg text-gray-600 max-w-2xl">
          Get instant predictions for heart disease, breast cancer, diabetes, and more using our AI-based machine learning model.
        </p>
        <Button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition">
          Start Prediction
        </Button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 p-10">
        <FeatureCard icon={<Heart size={40} />} title="Heart Disease" description="Predict heart disease risk based on key health metrics." />
        <FeatureCard icon={<BrainCircuit size={40} />} title="Brain Health" description="Analyze neurological patterns for potential disorders." />
        <FeatureCard icon={<Activity size={40} />} title="Diabetes" description="Assess diabetes risk using lifestyle and medical data." />
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
    >
      <div className="text-blue-600">{icon}</div>
      <h3 className="text-xl font-semibold mt-4">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
}
