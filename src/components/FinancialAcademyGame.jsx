import React, { useState } from 'react';
import './FinancialAcademyGame.css';

const FinancialAcademyGame = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'allowance-adventure',
      title: 'Allowance Adventure',
      description: 'A interactive game which will Help you to learn finace in a fun manner',
      image: 'https://via.placeholder.com/300x200.png?text=Chores+Image',
      action: () => alert('Allowance Adventure')
    },
    {
      id: 'piggy-bankers',
      title: 'Piggy Bnkers',
      description: 'wuah wuah.',
      image: 'https://via.placeholder.com/300x200.png?text=Spending+Image',
      action: () => alert('pig')
    },
    {
      id: 'finance-adventure',
      title: 'Finance Race',
      description: 'Save $5 and earn interest every 7 days.',
      image: 'https://via.placeholder.com/300x200.png?text=Saving+Image',
      action: () => alert('Save Money: Earn interest on $5!')
    },
    {
      id: 'investing',
      title: 'Invest Money',
      description: 'Invest $10 and watch your money grow!',
      image: 'https://via.placeholder.com/300x200.png?text=Investing+Image',
      action: () => alert('Invest Money: Grow 20% every 30 days!')
    },
    {
      id: 'allowance',
      title: 'Daily Allowance',
      description: 'Receive your daily allowance of $1.',
      image: 'https://via.placeholder.com/300x200.png?text=Allowance+Image',
      action: () => alert('Next Day: You received $1 allowance!')
    }
  ];

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
            <div className="game-info">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Game */}
      {selectedGame && (
        <div className="game-modal">
          <div className="modal-content">
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