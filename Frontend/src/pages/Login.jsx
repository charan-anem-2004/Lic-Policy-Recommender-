import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      const storedPrompt = localStorage.getItem("licPrompt");
      if (storedPrompt) {
        // Clear it after using
        localStorage.removeItem("licPrompt");
        navigate(`/recommendations?q=${encodeURIComponent(storedPrompt)}`);
      } else {
        navigate("/home");
      }
    }
  }, [isAuthenticated, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields");
    } else {
      login({ email, password });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#013b6d] via-[#00539c] to-[#073259] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-[#003461] mb-6">
          Account <span className="text-[#fcc860]">Login</span>
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#fcc860] text-[#003461] font-semibold rounded-full hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#00539c] font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
