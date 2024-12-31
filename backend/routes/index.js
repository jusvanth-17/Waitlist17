const express = require("express");
const cors = require("cors");
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Your React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);

app.use(express.json()); // Parse JSON requests

// Mock login route (replace with your actual logic)
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Replace this with your actual authentication logic
    if (email === "test@example.com" && password === "password") {
      const token = "mockJWTToken"; // Replace with a real JWT token
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Server initialization
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});