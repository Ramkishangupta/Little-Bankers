import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import defaultProfilePic from '../assets/Profile.png'; // Default profile picture
import useGetUserInfo from '../hooks/useGetUserInfo'; // Import your custom hook

const Header = ({ totalCoins }) => {
  const navigate = useNavigate();
  const { userId, userName, profilePhoto, isAuth } = useGetUserInfo(); // Get user info

  return (
    <header className="div">
      <h1>Little Bankers</h1>
      <nav>
        <button onClick={() => navigate('/dashboard')}>Home</button>
        <button onClick={() => navigate('/quiz')}>Quiz</button>
        <button onClick={() => navigate('/simulation')}>Money Game</button>
      </nav>
      <div className="header-right">
        <div className="coin-counter">
          <span role="img" aria-label="coin">🪙</span> {totalCoins}
        </div>
        {isAuth ? ( // Check if the user is authenticated
          <button
            // onClick={() => navigate('/login-page')} // Navigate to the profile page
            className="profile-icon"
            aria-label="Profile"
          >
            <img
              src={profilePhoto || defaultProfilePic} // Use profile photo or default image
              alt={userName || 'Profile'}
              className="profile-pic"
            />
          </button>
        ) : (
          <button
            onClick={() => navigate('/login-page')} // Navigate to login page
            className="login-button"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
