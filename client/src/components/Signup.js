import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [referral, setReferral] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", {
        name,
        email,
        password,
        phone,
        referredBy: referral,
      })
      .then((response) => {
        alert("Signup successful! Your referral code is: " + response.data.employee.referralCode);
        console.log(response.data);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Signup failed. Please try again.");
        navigate("/login");
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
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);

              // Validate password
              const hasLetter = /[a-zA-Z]/.test(value);
              const hasNumber = /\d/.test(value);
              const hasSymbol = /[@#$%^&+=]/.test(value);
              const isValidLength = value.length >= 8;

              if (hasLetter && hasNumber && hasSymbol && isValidLength) {
                setPasswordError(""); // No error
              } else {
                setPasswordError(
                  "Password must be at least 8 characters long and include letters, numbers, and symbols."
                );
              }
            }}
            required
            style={{ padding: "8px", flex: "1" }}
          />
          {/* Eye Icon */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            {showPassword ? (
              // Eye (Visible)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8a13.133 13.133 0 0 1-1.66 2.043C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.133 13.133 0 0 1 1.172 8z" />
                <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                <path d="M8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
              </svg>
            ) : (
              // Eye Slash (Hidden)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.359 11.238l1.36 1.36a.75.75 0 0 0 1.06-1.06l-13-13a.75.75 0 1 0-1.06 1.06l2.017 2.017A13.112 13.112 0 0 0 .173 8s3 5.5 8 5.5c1.765 0 3.328-.537 4.661-1.406l1.025 1.026zM4.282 5.161l.763.762A3.007 3.007 0 0 0 4 8c0 1.654 1.346 3 3 3 .425 0 .827-.09 1.192-.251l.762.763A4.003 4.003 0 0 1 4.282 5.16zm3.18-2.495a3.504 3.504 0 0 1 3.47 2.816 13.158 13.158 0 0 1 2.264 1.68 13.134 13.134 0 0 0-5.105-3.85c-.208-.053-.418-.08-.629-.08-.305 0-.611.036-.917.1l1.917 1.918zm-4.24 9.243l1.601-1.601A4.022 4.022 0 0 1 8 12a3.993 3.993 0 0 1-4.778-2.622zm10.11.324l-1.603-1.603a4.022 4.022 0 0 0-1.613 1.61l-1.917-1.917c-.039-.16-.062-.324-.062-.492 0-1.655 1.346-3 3-3 .168 0 .332.023.492.062l1.917-1.917A4.021 4.021 0 0 0 12 8c0 1.342.726 2.5 1.8 3.126z" />
              </svg>
            )}
          </span>
        </div>
        {passwordError && (
          <p style={{ color: "red", fontSize: "0.9rem", marginTop: "8px" }}>
            {passwordError}
          </p>
        )}

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