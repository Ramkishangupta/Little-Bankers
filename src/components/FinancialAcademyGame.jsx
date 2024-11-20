import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './FinancialAcademyGame.css';

const FinancialAcademyGame = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'chores',
      title: 'Stock Starters',
      description: 'An interactive Game for learning about Stocks',
      image: "https://firebasestorage.googleapis.com/v0/b/image-upload-ac665.appspot.com/o/images%2FWhatsApp%20Image%202024-10-19%20at%2013.24.51_dd05dac4.jpg1365e1fd-1204-47b7-a5bf-4548f49a136f?alt=media&token=c201e7d0-5909-441f-89a0-e913957ce6ec"
    },
    {
      id: 'spending',
      title: 'Flip the Cards',
      description: 'Learn About Money of Different countries',
      image: 'https://firebasestorage.googleapis.com/v0/b/image-upload-ac665.appspot.com/o/images%2FWhatsApp%20Image%202024-10-19%20at%2013.42.58_793c4a84.jpg678f55f3-32a2-49fc-a7d1-15cce008bfac?alt=media&token=c3e4108c-3600-48be-9f77-7a091cb8d3cb',
    },
    {
      id: 'saving',
      title: 'Guess Me',
      description: 'Guess Different Finance Related Image and earn coins',
      image: 'https://firebasestorage.googleapis.com/v0/b/image-upload-ac665.appspot.com/o/images%2FWhatsApp%20Image%202024-10-19%20at%2014.19.05_317ae2ab.jpgb2d0d6db-64fe-4e6c-b8ff-44cf2f0a3ec2?alt=media&token=1568f36d-2683-4cc8-99ee-2537cf4b9d29',
    },
  ];

  // Update the action for the first game to navigate to StockMarketGame
  games[0].action = () => navigate('/Little-Bankers/stock-market-game'); // Navigate to Stock Market Game
  games[1].action = () => navigate('/Little-Bankers/currency-match-game');
  games[2].action = () => navigate('/Little-Bankers/money-management');

  const openGame = (game) => {
    setSelectedGame(game);
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="financial-academy-container">
      <h2>Financial Academy - Money Management Games</h2>

      {/* Game Grid with Images */}
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card" onClick={() => openGame(game)}>
            <img src={game.image} alt={game.title} className="game-image" />
            <div className="game-info1">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Game */}
      {selectedGame && (
        <div className="game-modal">
          <div className="modal-content1">
            <h3>{selectedGame.title}</h3>
            <p>{selectedGame.description}</p>
            <button onClick={selectedGame.action}>Start Game</button>
            <button onClick={closeGame} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialAcademyGame;
