import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [referral, setReferral] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/signup", {
      name,
      email,
      password,
      phone,
      referredBy: referral,
    })
      .then((response) => {
        alert("Signup successful! Your referral code is: " + response.data.employee.referralCode);
        console.log(response.data);
        Navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Signup failed. Please try again.");
        Navigate("/login");

      });
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone number"
          pattern="[0-9]{10}"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label htmlFor="referral">Referral Code (optional):</label>
        <input
          type="text"
          id="referral"
          placeholder="Enter referral code"
          value={referral}
          onChange={(e) => setReferral(e.target.value)}
        />

        <button type="submit">Signup</button>
      </form>

      <p>
        Already registered? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Signup;