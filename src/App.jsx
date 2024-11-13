import React, { useState } from 'react';
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

const App = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false); // State to track loading completion

  const handleEarnCoins = (amount) => {
    setTotalCoins((prevCoins) => prevCoins + amount);
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz onComplete={handleQuizComplete} onEarnCoins={handleEarnCoins} />} />
            <Route path="/simulation" element={<FinancialAcademyGame />} />
            <Route path="/stock-market-game" element={<StockMarketGame totalCoins={totalCoins} />} />
            <Route path="/currency-match-game" element={<CurrencyMatch />} />
            <Route path="/login-page" element={<LoginPage />} />
            <Route path="/money-management" element={<MoneyManagementGame totalCoins={totalCoins} onEarnCoins={handleEarnCoins} />} />
            </Routes>
      </div>
    </Router>
  );
};

export default App;
