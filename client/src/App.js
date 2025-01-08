import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgottenPassword from "./components/ForgottenPassword";
import Leaderboard from "./components/Leaderboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/forgot-password" element={<ForgottenPassword />} /> 
        <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
    </Router>
  );
}

export default App;