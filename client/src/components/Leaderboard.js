import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userReferralCode, setUserReferralCode] = useState("");
  const [userPosition, setUserPosition] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUserReferralCode(userData.referralCode || "");
    }

    axios
      .get("http://localhost:3001/leaderboard")
      .then((response) => {
        setLeaderboard(response.data);

        const currentUser = response.data.find(
          (user) => user.email === userData?.email
        );
        if (currentUser) {
          setUserPosition(currentUser.position);
          if (currentUser.referralCount >= 98 && !currentUser.emailSent) {
            // Mark email as sent after successful email
            setEmailSent(true);
            localStorage.setItem("user", JSON.stringify(currentUser));
            console.log("Email sent successfully and stored in localStorage.");
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
      });
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>

      {userPosition && (
        <div className="your-position">
          <p>
            Your Position: <strong>{userPosition}</strong>
          </p>
        </div>
      )}

      {userReferralCode && (
        <div className="referral-code-container">
          <p>
            Your Code: <strong>{userReferralCode}</strong>
          </p>
        </div>
      )}

      {emailSent && (
        <div className="email-sent-notification">
          <p>Email sent successfully to the user!</p>
        </div>
      )}

      <div className="leaderboard-list">
        {leaderboard.map((emp) => (
          <div className="leaderboard-item" key={emp._id}>
            <p className="name">{emp.name || "Anonymous"}</p>
            <p className="referral-count">{emp.referralCount} referrals</p>
            <p className="position">Position: {emp.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
