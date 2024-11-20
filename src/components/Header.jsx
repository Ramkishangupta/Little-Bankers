import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';
import profilePic from '../assets/Profile.png'; // Adjust the path based on your project structure

const Header = ({ totalCoins }) => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <header className='div'>
      <h1>Little Bankers</h1>
      <nav>
        <button onClick={() => navigate('/dashboard')}>Home</button> {/* Navigate to Dashboard */}
        <button onClick={() => navigate('/quiz')}>Quiz</button>
        <button onClick={() => navigate('/simulation')}>Money Game</button>
      </nav>
      <div className="header-right">
        <div className="coin-counter">
          <span role="img" aria-label="coin">🪙</span> {totalCoins}
        </div>
        <button
          onClick={() => navigate('/login-page')}
          className='profile-icon'
          aria-label="Profile"
        >
          <img
            src={profilePic} // Use the local image
            alt="Profile"
            className="profile-pic"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
