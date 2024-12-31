const User = require('../model/User');
const signJwtToken = require('../config/jwt');

// Register new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if name, email, and password are provided by the client
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists, please login' });
    }

    // Create a new user (storing password in plain text, not recommended)
    const createdUser = await User.create({ name, email, password });

    console.log('User created');
    return res.status(201).json({ message: 'User registered successfully', user: createdUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again' });
  }
};

// Login the user and create a session
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided by the client
  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist, please register" });
    }

    // Compare the provided password with the stored password (plain text comparison)
    if (password !== existingUser.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = signJwtToken(existingUser);

    // Send the token and user details back
    res.status(200).json({ message: 'Logged in successfully', token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error, please try again' });
  }
};

module.exports = { login, register };
