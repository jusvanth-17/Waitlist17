import React, { useState } from "react";
import "../App.css";

function ForgottenPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1>Bike Service</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Forgotten Password Form */}
      <div className="form-container">
        <h2>Forgotten Password</h2>
        <p>Please enter your email address to receive a password reset link.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Reset Link</button>
        </form>

        {/* Back to Login Link */}
        <div className="form-links">
          <p>
            Remembered your password? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgottenPassword;