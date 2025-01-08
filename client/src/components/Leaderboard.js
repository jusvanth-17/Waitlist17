import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userReferralCode, setUserReferralCode] = useState('');
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage and leaderboard from backend
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      setUserReferralCode(userData.referralCode || '');
    }

    axios.get('http://localhost:3001/leaderboard')
      .then(response => {
        setLeaderboard(response.data);

        // Find and set the user's position
        const currentUser = response.data.find(user => user.email === userData?.email);
        if (currentUser) {
          setUserPosition(currentUser.position);
        }
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
      });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userReferralCode);
    alert('Referral Code Copied!');
  };

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>

      {userPosition && (
        <div className="your-position">
          <p>Your Position: <strong>{userPosition}</strong></p>
        </div>
      )}

      {userReferralCode && (
        <div className="referral-code-container">
          <p>Your Code: <strong>{userReferralCode}</strong></p>
          <button className="copy-btn" onClick={copyToClipboard}>
            Copy Code
          </button>
        </div>
      )}

      <div className="leaderboard-list">
        {leaderboard.map((emp) => (
          <div className="leaderboard-item" key={emp._id}>
            <p className="name">{emp.name || 'Anonymous'}</p>
            <p className="referral-count">{emp.referralCount} referrals</p>
            <p className="position">Position: {100 - emp.referralCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;