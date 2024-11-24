import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import FinancialAcademyGame from './components/FinancialAcademyGame';
import StockMarketGame from './components/StockMarketGame';
import LoadingPage from './components/LoadingPage';
import CurrencyMatch from './components/CurrencyMatch';
import MoneyManagementGame from './components/MoneyManagementGame';
import LoginPage from './components/LoginPage';
import {updateUserScore, fetchUserScore} from './config/firebaseActions';
import useGetUserInfo from './hooks/useGetUserInfo';
import Leaderboard from './components/Leaderboard';

const App = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false); // State to track loading completion
  const { userId } = useGetUserInfo();

  // Fetch user score when component mounts
  useEffect(() => {
    const fetchScore = async () => {
      if (userId) {
        const userScore = await fetchUserScore(userId);
        setTotalCoins(userScore);
      }
    };
    fetchScore();
  }, [userId]);

  const handleEarnCoins = (amount) => {
    const updatedCoins = totalCoins + amount;
    setTotalCoins(updatedCoins);
    if (userId) {
      updateUserScore(userId, updatedCoins);
    }
  };

  const handleLoadingComplete = () => {
    setLoadingComplete(true); // Set loading to complete
  };

  const handleQuizComplete = (score) => {
    // Handle quiz completion logic
  };

  return (
    <Router>
      <div className="app">
        <Header totalCoins={totalCoins} />
          <Routes>
            {/* Render LoadingPage if loading is not complete */}
            <Route 
              path="/Little-Bankers/" 
              element={!loadingComplete ? <LoadingPage onLoadingComplete={handleLoadingComplete} /> : <Dashboard />} 
            />
            <Route path="/Little-Bankers/dashboard" element={<Dashboard />} />
            <Route path="/Little-Bankers/quiz" element={<Quiz onComplete={handleQuizComplete} onEarnCoins={handleEarnCoins} />} />
            <Route path="/Little-Bankers/simulation" element={<FinancialAcademyGame />} />
            <Route path="/Little-Bankers/stock-market-game" element={<StockMarketGame totalCoins={totalCoins} />} />
            <Route path="/Little-Bankers/currency-match-game" element={<CurrencyMatch />} />
            <Route path="/Little-Bankers/login-page" element={<LoginPage />} />
            <Route path="/Little-Bankers/money-management" element={<MoneyManagementGame totalCoins={totalCoins} onEarnCoins={handleEarnCoins} />} />
            <Route path="/Little-Bankers/leaderboard" element={<Leaderboard />} />
            </Routes>
      </div>
    </Router>
  );
};

export default App;
