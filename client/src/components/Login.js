import React, { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // Make sure axios is installed

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook for routing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", formData);
      // Handle successful login, like storing user info in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("position", response.data.position);
      localStorage.setItem("name", JSON.stringify(response.data.user.name));
      alert("Login successful!");
      // Redirect to leaderboard after successful login
      navigate("/leaderboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>


      <div className="form-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <div className="form-links">
          <p>
            Don't have an account? <Link to="/signup">Signup here</Link>
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default Login;