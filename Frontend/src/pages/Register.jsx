import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../auth/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      clearErrors();
      setLoading(false);
    }
  }, [isAuthenticated, error, navigate, clearErrors]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      password2 === ""
    ) {
      toast.error("Please enter all fields");
    } else if (password !== password2) {
      toast.error("Passwords didn't match");
    } else {
      setLoading(true);
      register({ username, email, password });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#013b6d] via-[#00539c] to-[#073259] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-[#003461] mb-6">
          Account <span className="text-[#fcc860]">Register</span>
        </h2>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              placeholder="Enter your username"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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
              minLength="6"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="password2"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#00539c]"
              placeholder="Confirm your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-[#fcc860] text-[#003461] font-semibold rounded-full transition hover:opacity-90 flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-[#003461]"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Creating...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#00539c] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
