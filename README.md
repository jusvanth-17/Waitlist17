Waitlist Application
A referral-based waitlist application where users can sign up, receive a unique referral code, and climb the leaderboard by referring others. When a user's position reaches 1, they receive an email notification.
Features
1. User Signup/Login: Users can sign up and log in to access their referral code and position.
2. Leaderboard: Displays all users, sorted by their position based on referral count.
3. Referral System: Users can share a referral code to improve their position.
4. Email Notification: The top-ranked user receives an email notification.
Tech Stack
- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Email Service: Nodemailer
Prerequisites
1. Install Node.js and npm: https://nodejs.org/
2. Install MongoDB and ensure it is running locally: https://www.mongodb.com/try/download/community
3. Create a Gmail account for sending emails.
Step-by-Step Setup
1. Clone the Repository
```bash
git clone https://github.com/your-username/waitlist-app.git
cd waitlist-app
```
2. Set Up the Backend
1. Navigate to the backend directory:
```bash
cd backend
```
2. Install dependencies:
```bash
npm install
```
3. Configure the database and email settings:
- Open `index.js`.
- Update the MongoDB URI:
```javascript
const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
```
- Update the email credentials:
```javascript
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail
    pass: 'your-app-password',    // Replace with your Gmail app password
  },
});
```
4. Start the backend server:
```bash
node index.js
```
The server will run at http://localhost:3001.
3. Set Up the Frontend
1. Navigate to the frontend directory:
```bash
cd ../frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend development server:
```bash
npm start
```
The frontend will run at http://localhost:3000.

```
Usage
1. Sign Up
Access the app at http://localhost:3000. Sign up with your details. Optionally, use a referral code to attribute your signup to another user.
2. View Your Referral Code
After signing up, you will see your unique referral code. Share it with others to improve your leaderboard position.
3. Check Leaderboard
View the leaderboard to see your position relative to other users.
![image](https://github.com/user-attachments/assets/1551c834-b5a8-4444-bf20-af76a05dec9c)
