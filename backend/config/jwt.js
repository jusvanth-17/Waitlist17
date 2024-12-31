const jwt = require('jsonwebtoken');

// Ensure you're getting the JWT secret from environment variables
const signJswtToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' }); // 1 hour expiration time
  return token;
};

module.exports = { signJswtToken };
