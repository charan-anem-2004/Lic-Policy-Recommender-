import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  // Handle redirection after successful login
  useEffect(() => {
    if (isAuthenticated) {
      const storedPrompt = localStorage.getItem("licPrompt");
      localStorage.removeItem("licPrompt");
      navigate(
        storedPrompt
          ? `/recommendations?q=${encodeURIComponent(storedPrompt)}`
          : "/home"
      );
    }
  }, [isAuthenticated, navigate]);

  // Show error toast if login fails
  useEffect(() => {
    if (error) {
      clearErrors();
      setIsSubmitting(false);
    }
  }, [error, clearErrors]);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.warning("Please fill in all fields");
    } else {
      setIsSubmitting(true);
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
              value={password}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 bg-[#fcc860] text-[#003461] font-semibold rounded-full transition flex justify-center items-center ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:opacity-90"
            }`}
          >
            {isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-[#003461]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register Link */}
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
