import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = ({ handleLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation for required fields
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    // Password confirmation check
    if (password !== confirmPassword) {
      toast.error("Confirm password does not match");
      return;
    }

    setLoading(true);

    const user = { name, email, password };

    try {
      // Sending the request to register the user
      const response = await axios.post(`http://localhost:8000/auth/register`, {
        user,
      });

      if (response.status !== 200) {
        console.log(response.data.message);
        toast.error(response.data.message);
      } else {
        console.log(response.data);
        toast.success("Registered successfully");
        handleLogin(); // After successful registration, navigate to login
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e, changeState) => {
    changeState(e.target.value);
  };

  return (
    <div className="h-[70%] w-[80%] md:w-[70%] rounded-xl flex flex-col gap-2">
      <h3 className="text-3xl">Create an account</h3>
      <p className="text-gray-500 text-sm">Please enter your email and a password for your account.</p>

      {/* Register Form */}
      <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          placeholder="Name"
          className="login-input"
          type="text"
          value={name}
          onChange={(e) => handleInput(e, setName)}
        />
        
        <label>Email</label>
        <input
          placeholder="Email"
          className="login-input"
          type="email"
          value={email}
          onChange={(e) => handleInput(e, setEmail)}
        />
        
        <label>Password</label>
        <input
          placeholder="Password"
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => handleInput(e, setPassword)}
        />
        
        <label>Confirm password</label>
        <input
          placeholder="Confirm password"
          className="login-input"
          value={confirmPassword}
          type="password"
          onChange={(e) => handleInput(e, setConfirmPassword)}
        />

        <button type="submit" className="login-btn mt-5" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-gray-500 text-sm m-auto mt-5">
          Have an account?{" "}
          <span>
            <button onClick={handleLogin} className="text-md underline text-blue-500">
              Login
            </button>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
