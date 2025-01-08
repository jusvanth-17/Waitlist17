import express from 'express';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

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

// Generate Referral Code
const generateReferralCode = () => Math.random().toString(36).substring(2, 10);

// Setup Email Transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jusvanth175@gmail.com', // Replace with your email
    pass: 'eaap exin uafa pwdh', // Replace with your email password
  },
});

// Helper Function: Send Email
const sendEmail = (email, name) => {
  const mailOptions = {
    from: 'jusvanth175@gmail.com',
    to: email,
    subject: 'Congratulations! You are now #1 on the leaderboard',
    text: `Hi ${name},\n\nCongratulations! You have reached the #1 position on our leaderboard thanks to your referrals. Keep up the great work!\n\nBest Regards,\nTeam`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Signup Endpoint
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

    const referralCode = generateReferralCode();
    const newUser = {
      name,
      email,
      password,
      phone,
      referredBy,
      referralCode,
      referralCount: 0,
      position: 100, // Default position (calculated dynamically later)
    };

    await db.collection('employees').insertOne(newUser);

    // Update referral count and position for the referrer
    if (referredBy) {
      const referrer = await db.collection('employees').findOneAndUpdate(
        { referralCode: referredBy },
        { $inc: { referralCount: 1 } },
        { returnDocument: 'after' }
      );

      if (referrer.value) {
        const newPosition = 100 - referrer.value.referralCount;
        await db.collection('employees').updateOne(
          { email: referrer.value.email },
          { $set: { position: newPosition } }
        );

        if (newPosition === 1) {
          sendEmail(referrer.value.email, referrer.value.name);
        }
      }
    }

    res.status(201).json({ message: 'Signup successful', employee: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Leaderboard Endpoint
app.get('/leaderboard', async (req, res) => {
  try {
    const employees = await db.collection('employees').find({}).toArray();

    const leaderboard = employees.map((user) => ({
      ...user,
      position: 100 - user.referralCount,
    })).sort((a, b) => a.position - b.position); // Sort by position ascending

    res.status(200).json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});