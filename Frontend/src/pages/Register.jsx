import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';
import './Register.css'; // Import the CSS file

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = user;

  const onChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (username === '' || email === '' || password === '') {
      alert('Please enter all fields');
    } else if (password !== password2) {
      alert('Passwords do not match');
    } else {
      register({ username, email, password });
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">
          Account <span className="text-primary">Register</span>
        </h1>
        <form onSubmit={onSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" value={email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
          </div>
          <input type="submit" value="Register" className="btn btn-primary btn-block" />
        </form>
        <p className="register-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
