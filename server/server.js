import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sendEmail } from './email.js';  // Import the sendEmail function

const app = express();
const port = 3001;

// Middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(bodyParser.json());

// MongoDB Connection
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const dbName = 'Employee';
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Signup Endpoint (for reference)
app.post('/signup', async (req, res) => {
  const { name, email, password, phone, referredBy } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingUser = await db.collection('employees').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const referralCode = Math.random().toString(36).substring(2, 10);
    const newUser = {
      name,
      email,
      password,
      phone,
      referredBy,
      referralCode,
      referralCount: 0,
      emailSent: false,  // Track if email has been sent
    };

    await db.collection('employees').insertOne(newUser);

    res.status(201).json({ message: 'Signup successful', employee: newUser });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Leaderboard Endpoint (check referral count and send email)
app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await db.collection('employees').find({}).sort({ referralCount: -1 }).toArray();
    
    for (const user of leaderboard) {
      if (user.referralCount === 98 && !user.emailSent) {
        // Send email only if the user has reached 98 referrals and hasn't received an email
        await sendEmail(user.name, user.email);
        
        // Update the emailSent field to true
        await db.collection('employees').updateOne(
          { email: user.email },
          { $set: { emailSent: true } }
        );
      }
    }

    // Update positions dynamically
    leaderboard.forEach((user, index) => {
      user.position = index + 1;
    });

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await db.collection('employees').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
