import React, { useContext } from "react";
import { assets } from "../assets/assets";
import AuthContext from "../auth/AuthContext";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#013b6d] via-[#00539c] to-[#013b6d] mb-4 pb-30">
      {/* Header */}
      <div className="flex justify-between items-center px-6 md:px-15 py-6 md:py-10">
        <img
          className="h-10 md:h-auto w-28 md:w-30 object-contain scale-130 md:scale-155"
          src={assets.logo}
          alt="logo"
        />
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="px-5 md:px-6 py-2 bg-[#fcc860] text-[#003461] rounded-full font-semibold shadow hover:opacity-90 transition text-sm md:text-base"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="px-5 md:px-6 py-2 bg-[#fcc860] text-[#003461] rounded-full font-semibold shadow hover:opacity-90 transition text-sm md:text-base">
              Login / Register
            </button>
          </Link>
        )}
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center h-full w-full px-4 md:px-10 lg:px-20 text-center">
        <div className="text-center pt-10 md:pt-17 px-4 sm:px-6 max-w-4xl flex flex-col items-center gap-4">
          <div className="w-fit text-center px-6 py-2 border border-white/20 rounded-3xl bg-white/10 backdrop-blur-lg shadow-md">
            <p className="text-white font-medium text-sm sm:text-base">
              <span className="mr-2">✨</span>AI-Powered Insurance
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-indigo-50 font-extrabold leading-tight">
            Smart <span className="text-[#fcc860]">LIC Policy</span> Recommender
          </h1>
          <h2 className="text-white/70 text-sm sm:text-base md:text-lg font-medium leading-snug mb-6 md:mb-10">
            Discover the perfect Life Insurance Corporation policy tailored just
            for you. Our advanced AI analyzes your profile, financial goals, and
            life circumstances to recommend the most suitable LIC policies with
            optimal coverage and returns.
          </h2>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8">
            {[
              "Instant AI-powered policy recommendations",
              "Compare multiple LIC policies in seconds",
              "Personalized coverage suggestions",
              "Expert-level analysis for free",
              "No hidden fees or commissions",
            ].map((text, idx) => (
              <span
                key={idx}
                className="text-white flex items-center gap-2 bg-white/15 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-[#fcc860]"
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
            <button className="mt-4 px-5 md:px-6 py-2.5 md:py-3 bg-white text-[#00539c] font-semibold rounded-full text-sm md:text-lg shadow-md hover:scale-105 transition-all flex items-center gap-2">
              Get My Recommendations
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5 text-[#f4a200]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" />
              </svg>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
