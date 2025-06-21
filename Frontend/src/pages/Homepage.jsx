import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Features from "../components/Features";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import HeroSection from "../components/HeroSection";

export default function HomePage() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    occupation: "",
    sumAssured: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    try {
      logout();
      localStorage.removeItem("licPrompt");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const prompt = `
    User Details:
    Name: ${formData.name}
    Age: ${formData.age}
    Gender: ${formData.gender}
    Occupation: ${formData.occupation}
    Minimum Sum Assured: ${formData.sumAssured}
    Description of Needs: ${formData.description}
  `;

    if (isAuthenticated) {
      navigate(`/recommendations?q=${encodeURIComponent(prompt)}`);
    } else {
      localStorage.setItem("licPrompt", prompt);
      navigate("/login");
    }
  };

  return (
    <div>
      <HeroSection />
      <Features />
      <div
        id="recommendation-form"
        className="max-w-6xl mx-auto mt-10 mb-30 bg-white rounded-xl shadow-xl overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#0360b2] via-[#0374d8] to-[#01529d] p-6 sm:p-10 text-white text-center">
          <h2 className="text-xl sm:text-2xl font-bold">
            Get Your{" "}
            <span className="text-[#fcc860] font-extrabold">Personalized</span>{" "}
            Recommendations
          </h2>
          <p className="mt-1 text-sm">
            Fill in your details and let our AI find the perfect LIC policy for
            you
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              required
            />
          </div>

          {/* Age & Occupation */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Your age"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
                required
              />
            </div>

            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Enter your occupation"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              />
            </div>
          </div>

          {/* Sum Assured */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desired Sum Assured (₹)
            </label>
            <input
              type="number"
              name="sumAssured"
              value={formData.sumAssured}
              onChange={handleChange}
              placeholder="Select your desired coverage amount"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
            />
          </div>

          {/* Additional Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Information
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us about your financial goals, family situation, or any specific requirements…"
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-fit px-6 py-3 rounded-md text-white font-semibold bg-[#0c79d7] hover:opacity-90 transition text-sm sm:text-base"
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L11 13.586V5a1 1 0 011-1z" />
              </svg>
              Get AI{" "}
              <span className="text-[#fcc860] font-bold">Recommendations</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
