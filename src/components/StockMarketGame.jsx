import { useState, useEffect, useCallback } from 'react';
import { TrendingUp, DollarSign, BarChart2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import confetti from 'canvas-confetti';
import './StockMarketGame.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const initialStocks = [
  { name: 'Toy Co', price: 10, shares: 0, history: [10], icon: '🧸' },
  { name: 'Game World', price: 15, shares: 0, history: [15], icon: '🎮' },
  { name: 'Sweet Treats', price: 5, shares: 0, history: [5], icon: '🍭' },
  { name: 'Pet Paradise', price: 20, shares: 0, history: [20], icon: '🐶' },
];

const StockMarketGame = ({ totalCoins }) => {
  const [stocks, setStocks] = useState(initialStocks);
  const [piggyBank, setPiggyBank] = useState(totalCoins);
  const [day, setDay] = useState(1);
  const [showTip, setShowTip] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const tips = [
    "Buying low and selling high is the key to making money in stocks!",
    "Diversify your investments to reduce risk.",
    "Be patient! Sometimes stocks take time to grow.",
    "Keep an eye on the trends, but don't panic if prices drop a little.",
    "Remember, it's just a game - have fun and learn!",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      updateStockPrices();
      setDay(prevDay => prevDay + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const newNetWorth = calculateNetWorth();
    if (newNetWorth >= 200) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    if (day % 5 === 0) {
      setShowTip(true);
      setTipIndex(prevIndex => (prevIndex + 1) % tips.length);
      setTimeout(() => setShowTip(false), 5000);
    }
  }, [stocks, piggyBank, day, calculateNetWorth, tips.length]);

  const updateStockPrices = () => {
    setStocks(prevStocks =>
      prevStocks.map(stock => {
        const change = (Math.random() - 0.5) * 2;
        const newPrice = Math.max(1, stock.price + change);
        return {
          ...stock,
          price: Number(newPrice.toFixed(2)),
          history: [...stock.history, newPrice],
        };
      })
    );
  };

  const buyStock = (index) => {
    if (piggyBank >= stocks[index].price) {
      setStocks(prevStocks =>
        prevStocks.map((stock, i) =>
          i === index ? { ...stock, shares: stock.shares + 1 } : stock
        )
      );
      setPiggyBank(prevPiggyBank => Number((prevPiggyBank - stocks[index].price).toFixed(2)));
    }
  };

  const sellStock = (index) => {
    if (stocks[index].shares > 0) {
      setStocks(prevStocks =>
        prevStocks.map((stock, i) =>
          i === index ? { ...stock, shares: stock.shares - 1 } : stock
        )
      );
      setPiggyBank(prevPiggyBank => Number((prevPiggyBank + stocks[index].price).toFixed(2)));
    }
  };

  const calculateNetWorth = useCallback(() => {
    return Number((piggyBank + stocks.reduce((total, stock) => total + stock.price * stock.shares, 0)).toFixed(2));
  }, [piggyBank, stocks]);

  return (
    <div className="game-container">
      <h2 className="game-title">
        <BarChart2 className="icon" /> Stock Market Adventure
      </h2>
      <div className="game-info">
        <div>
          <p className="day">Day: {day}</p>
          <p className="piggy-bank1">
            <DollarSign className="icon" /> Piggy Bank: {piggyBank.toFixed(2)}
          </p>
          <p className="net-worth">
            <TrendingUp className="icon" /> Total Value: {calculateNetWorth().toFixed(2)}
          </p>
          <img src="https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif" alt="Money gif" className="money-gif" />
        </div>
      </div>
      {showTip && (
        <div className="tip-box">
          <p className="tip-title">💡 Stock Market Tip:</p>
          <p>{tips[tipIndex]}</p>
        </div>
      )}
      <div className="stock-table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Coin</th>
              <th>Shares</th>
              <th>Actions</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr key={stock.name}>
                <td>
                  <span className="stock-icon">{stock.icon}</span>
                  {stock.name}
                </td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{stock.shares}</td>
                <td>
                  <button
                    onClick={() => buyStock(index)}
                    className="buy-button"
                    disabled={piggyBank < stock.price}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => sellStock(index)}
                    className="sell-button"
                    disabled={stock.shares === 0}
                  >
                    Sell
                  </button>
                </td>
                <td>
                  <Line
                    data={{
                      labels: stock.history.map((_, i) => i),
                      datasets: [{ data: stock.history, borderColor: 'rgb(75, 192, 192)', tension: 0.1 }]
                    }}
                    options={{ plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="gif-container">
      </div>
    </div>
  );
};

export default StockMarketGame;
