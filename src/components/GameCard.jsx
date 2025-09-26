import './GameCard.css';

const GameCard = ({ gameData, onAnswerClick }) => {
  return (
    <div className="game-card1">
      <img
        src={gameData.image}
        alt="Game Image"
        className="game-image"
      />
      <h2 className="game-question">{gameData.question}</h2>
      <div className="options-grid">
        {gameData.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onAnswerClick(option)}
            className="option-button"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameCard;