import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";
import setAuthToken from "../utills/SetAuthtoken";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
} from "./types";
import { toast } from "react-toastify";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const base_url = "https://lic-policy-recommender-backend.onrender.com"; // Update with your backend URL

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      dispatch({ type: AUTH_ERROR });
      toast.error("No token found, please login again.");
      return;
    }

    try {
      const res = await axios.get(`${base_url}/api/auth`);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
      toast.error("Failed to load user. Please try again.");
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${base_url}/api/auth/register`,
        formData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      toast.success("User registered successfully");
      setAuthToken(res.data.token);
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response?.data?.msg || "Registration failed",
      });
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${base_url}/api/auth/login`,
        formData,
        config
      );
      setAuthToken(res.data.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      toast.success("Login successful");
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response?.data?.msg || "Login failed",
      });
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  // Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
    toast.info("You have been logged out.");
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
