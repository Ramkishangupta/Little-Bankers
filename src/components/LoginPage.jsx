import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import './LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook to navigate to another route

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!username || !password || (!isLogin && !email)) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!isLogin && !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Login or Registration logic
    if (isLogin) {
      // Login with Firebase Auth
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Login successful!');
          navigate('/dashboard'); // Redirect to dashboard on success
        })
        .catch((err) => setError(err.message));
    } else {
      // Register with Firebase Auth
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          console.log('Registration successful!');
          navigate('/dashboard'); // Redirect to dashboard on success
        })
        .catch((err) => setError(err.message));
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="login-container">
      <div className="gradient-bar"></div>
      <h1 className="title">Little Bankers</h1>
      <div className="logo-container">
        <svg className="logo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5C12 3.34315 10.6569 2 9 2H3C2.44772 2 2 2.44772 2 3V9C2 10.6569 3.34315 12 5 12H9C10.6569 12 12 10.6569 12 9V5Z" fill="#FCD34D"/>
          <path d="M12 15C12 13.3431 13.3431 12 15 12H21C21.5523 12 22 12.4477 22 13V19C22 20.6569 20.6569 22 19 22H15C13.3431 22 12 20.6569 12 19V15Z" fill="#34D399"/>
          <path d="M5 22C3.34315 22 2 20.6569 2 19V15C2 13.3431 3.34315 12 5 12H9C10.6569 12 12 13.3431 12 15V19C12 20.6569 10.6569 22 9 22H5Z" fill="#60A5FA"/>
          <path d="M15 2C13.3431 2 12 3.34315 12 5V9C12 10.6569 13.3431 12 15 12H19C20.6569 12 22 10.6569 22 9V3C22 2.44772 21.5523 2 21 2H15Z" fill="#F472B6"/>
        </svg>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <label htmlFor="username" className="label">
            Username
          </label>
        </div>
        {!isLogin && (
          <div className="input-group">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Email"
              required
            />
            <label htmlFor="email" className="label">
              Email
            </label>
          </div>
        )}
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle"
          >
            {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
          </button>
        </div>
        {error && (
          <div className="error">
            <AlertCircle className="error-icon" />
            {error}
          </div>
        )}
        <button type="submit" className="submit-button">
          {isLogin ? 'Log In' : 'Register'}
        </button>
      </form>
      <div className="toggle-mode">
        <button onClick={toggleMode} className="toggle-button">
          {isLogin ? "Don't have an account? Register" : "Already have an account? Log in"}
        </button>
      </div>
      {isLogin && (
        <div className="forgot-password">
          <a href="#" className="forgot-password-link">Forgot your password?</a>
        </div>
      )}
    </div>
  );
};

export default LoginPage;