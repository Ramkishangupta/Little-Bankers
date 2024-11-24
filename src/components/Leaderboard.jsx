import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../config/firebase-config'; // Update path to your Firebase config file
import './Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch leaderboard data from Firestore
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const leaderboardCollection = collection(firestore, "users"); // Update collection name if needed
      const leaderboardSnapshot = await getDocs(leaderboardCollection);
      const leaderboardData = leaderboardSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort users by score in descending order
      leaderboardData.sort((a, b) => b.score - a.score);
      setUsers(leaderboardData);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard">
      <h1 className="leaderboard-title">🏆 Little Bankers Leaderboard 🏆</h1>
      <div className="leaderboard-list">
        {users.map((user, index) => (
          <div key={user.id} className={`leaderboard-item ${index % 2 === 0 ? 'child-theme-even' : 'child-theme-odd'}`}>
            <div className="rank-badge">#{index + 1}</div>
            <img
              src={user.ProfileUrl}
              alt={`${user.name}'s profile`}
              className="leaderboard-profile-pic"
            />
            <div className="leaderboard-info">
              <h3 className="leaderboard-name">{user.name}</h3>
              <p className="leaderboard-score">Coins: {user.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
