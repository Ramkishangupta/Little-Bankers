import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import defaultProfilePic from '../assets/Profile.png'; // Default profile picture
import useGetUserInfo from '../hooks/useGetUserInfo'; // Import custom hook

const Header = ({ totalCoins }) => {
  const navigate = useNavigate();
  const { userId, userName, profilePhoto, isAuth } = useGetUserInfo();
  return (
    <header className="div">
      <h1>Little Bankers</h1>
      <nav>
        <button onClick={() => navigate('/Little-Bankers/dashboard')}>Home</button>
        <button onClick={() => navigate('/Little-Bankers/quiz')}>Quiz</button>
        <button onClick={() => navigate('/Little-Bankers/simulation')}>Money Game</button>
      </nav>
      <div className="header-right">
        <div className="coin-counter">
          <span role="img" aria-label="coin">🪙</span> {totalCoins}
        </div>
        <button
          onClick={() => (isAuth ? navigate('/Little-Bankers/leaderboard') : navigate('/Little-Bankers/login-page'))} // Navigate to profile or login page
          className="profile-icon"
          aria-label="Profile"
        >
          <img
            src={isAuth && profilePhoto ? profilePhoto : defaultProfilePic} // Show user profile photo if authenticated, else default photo
            alt={isAuth && userName ? `${userName}'s Profile` : 'Default Profile'}
            className="profile-pic"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
