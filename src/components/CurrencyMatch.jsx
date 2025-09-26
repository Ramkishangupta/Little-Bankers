import { useState, useEffect } from 'react';
import './CurrencyMatch.css';

const countryCurrencyPairs = [
  { country: 'United States', currency: 'Dollar' },
  { country: 'Japan', currency: 'Yen' },
  { country: 'United Kingdom', currency: 'Pound' },
  { country: 'European Union', currency: 'Euro' },
  { country: 'Switzerland', currency: 'Franc' },
  { country: 'Canada', currency: 'Canadian Dollar' },
  { country: 'Australia', currency: 'Australian Dollar' },
  { country: 'China', currency: 'Yuan' },
  { country: 'India', currency: 'Rupee' },
  { country: 'Brazil', currency: 'Real' },
  { country: 'Russia', currency: 'Ruble' },
  { country: 'Mexico', currency: 'Peso' },
  { country: 'South Korea', currency: 'Won' },
  { country: 'Sweden', currency: 'Krona' },
  { country: 'South Africa', currency: 'Rand' },
  { country: 'Sweden', currency: 'Krona' },
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const GlobalCurrencyGame = () => {
  const [cards, setCards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [message, setMessage] = useState('');
  const [flippedIndexes, setFlippedIndexes] = useState([]);

  // Initialize and shuffle the cards when the component mounts
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newCards = [];
    countryCurrencyPairs.forEach((pair) => {
      newCards.push({ content: pair.country, type: 'country', flipped: false, matched: false });
      newCards.push({ content: pair.currency, type: 'currency', flipped: false, matched: false });
    });
    shuffleArray(newCards);
    setCards(newCards);
    setFlippedIndexes([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setCurrentPlayer(1);
    setMessage('');
  };

  const flipCard = (index) => {
    // Prevent flipping more than two cards
    if (flippedIndexes.length < 2 && !cards[index].flipped && !cards[index].matched) {
      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);
      setFlippedIndexes((prev) => [...prev, index]);

      if (flippedIndexes.length === 1) {
        // Check match when two cards are flipped
        setTimeout(() => checkMatch(flippedIndexes[0], index), 1000);
      }
    }
  };

  const checkMatch = (firstIndex, secondIndex) => {
    const newCards = [...cards];
    const isMatch = newCards[firstIndex].type !== newCards[secondIndex].type &&
      countryCurrencyPairs.some(
        (pair) =>
          (pair.country === newCards[firstIndex].content && pair.currency === newCards[secondIndex].content) ||
          (pair.country === newCards[secondIndex].content && pair.currency === newCards[firstIndex].content)
      );

    if (isMatch) {
      newCards[firstIndex].matched = true;
      newCards[secondIndex].matched = true;
      setMessage('🎉 Correct match! +1 point');
      if (currentPlayer === 1) {
        setPlayer1Score((prev) => prev + 1);
      } else {
        setPlayer2Score((prev) => prev + 1);
      }
    } else {
      newCards[firstIndex].flipped = false;
      newCards[secondIndex].flipped = false;
      setMessage('❌ Incorrect match! Try again!');
    }

    setCards(newCards);
    setFlippedIndexes([]);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const restartGame = () => {
    initializeGame();
  };

  const gameOver = cards.every((card) => card.matched);

  return (
    <div className="container">
      <h1>Global Currency Adventure</h1>
      <div className="game-info">
        <div className="player player1">
          <h2>Player 1</h2>
          <p>Score: <span>{player1Score}</span></p>
        </div>
        <div className="current-player">
          <p>Current Player: <span>{currentPlayer}</span></p>
        </div>
        <div className="player player2">
          <h2>Player 2</h2>
          <p>Score: <span>{player2Score}</span></p>
        </div>
      </div>
      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
            onClick={() => flipCard(index)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="message">{message}</div>
      {gameOver && (
        <div className="end-game">
          <p>🏆 Game Over! {player1Score > player2Score ? 'Player 1' : player2Score > player1Score ? 'Player 2' : 'It\'s a tie'} wins!</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default GlobalCurrencyGame;
