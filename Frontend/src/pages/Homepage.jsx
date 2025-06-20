import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Features from "../components/Features";
import { assets } from "../assets/assets";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

import { Link } from "react-router-dom";

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

  // Handle input changes
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
      localStorage.removeItem("licPrompt"); // Clear stored prompt on logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Handle form submission

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
      // Store prompt temporarily
      localStorage.setItem("licPrompt", prompt);
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="w-full bg-gradient-to-r from-[#013b6d] via-[#00539c] to-[#073259] mb-4">
        <div className="flex justify-between items-center px-15 py-10 ">
          <img
            className="h-auto w-30 object-contain"
            src={assets.logo}
            alt="logo"
          />
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-[#fcc860] text-[#003461] rounded-full font-semibold shadow hover:opacity-90 transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="px-6 py-2 bg-[#fcc860] text-[#003461] rounded-full font-semibold shadow hover:opacity-90 transition">
                Login / Register
              </button>
            </Link>
          )}
        </div>
        <div className="hero ">
          <div className="container">
            <div className="flex flex-col items-center justify-center h-full gap-30 w-full">
              <div className="text-center pt-20 px-4 sm:px-10 max-w-4xl w-full flex flex-col items-center justify-center gap-4">
                <div className="w-fit text-center px-7 py-2 border border-white/20 rounded-3xl bg-white/10 backdrop-blur-lg shadow-md">
                  <p className="text-white font-medium">
                    <span className="mr-2">✨</span>AI-Powered Insurance
                  </p>
                </div>

                <h1 className="text-6xl text-indigo-50 font-extrabold leading-tight ">
                  Smart <span className="text-[#fcc860]">LIC Policy </span>
                  Recommender
                </h1>

                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
                  <h2 className="text-white/70 text-lg sm:text-1xl md:text-1xl font-medium leading-snug mb-10">
                    Discover the perfect Life Insurance Corporation policy
                    tailored just for you. Our advanced AI analyzes your
                    profile, financial goals, and life circumstances to
                    recommend the most suitable LIC policies with optimal
                    coverage and returns.
                  </h2>

                  {/* Features */}
                  <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {[
                      "Instant AI-powered policy recommendations",
                      "Compare multiple LIC policies in seconds",
                      "Personalized coverage suggestions",
                      "Expert-level analysis for free",
                      "No hidden fees or commissions",
                    ].map((text, idx) => (
                      <span
                        key={idx}
                        className=" text-white flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold shadow-sm"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#fcc860]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {text}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <a href="#recommendation-form">
                    <button className="mt-4 px-6 py-3 bg-white text-[#00539c] font-semibold rounded-full text-lg shadow-md hover:scale-105 transition-all flex items-center gap-2">
                      Get My Recommendations
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#f4a200]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
                      </svg>
                    </button>
                  </a>
                </div>
              </div>
              <Features />
            </div>
          </div>
        </div>
      </div>
      <div
        id="recommendation-form"
        className="max-w-6xl mx-auto mt-10 mb-10 bg-white rounded-xl shadow-xl overflow-hidden"
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-[#0360b2] via-[#0374d8] to-[#01529d] p-10 text-white text-center">
          <h2 className="text-2xl font-bold">
            Get Your Personalized Recommendations
          </h2>
          <p className="mt-1 text-sm">
            Fill in your details and let our AI find the perfect LIC policy for
            you
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
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

          {/* Age & Occupation (Side-by-side) */}
          <div className="flex gap-4">
            <div className="w-1/2">
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

            <div className="w-1/2">
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
            className="w-fit px-7 py-3 rounded-md text-white font-semibold bg-gradient-to-r from-[#0360b2] via-[#0374d8] to-[#01529d] hover:opacity-90 transition"
          >
            <span className="inline-flex items-center gap-2 justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4a1 1 0 011 1v8.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L11 13.586V5a1 1 0 011-1z" />
              </svg>
              Get AI Recommendations
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
