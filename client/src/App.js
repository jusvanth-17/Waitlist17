import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgottenPassword from "./components/ForgottenPassword";
import Leaderboard from "./components/Leaderboard";
import { Navbar } from "./components/Navbar";
import Profile from "./components/Profile";
function App() {
  return (
    
    <Router>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/forgot-password" element={<ForgottenPassword />} /> 
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile/>} />
        </Routes>
    </Router>
  );
}

export default App;