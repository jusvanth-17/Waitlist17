import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  referredBy: { type: String, default: null },
  referralCode: { type: String, default: () => Math.random().toString(36).substr(2, 9) }, // Generates a unique referral code
  referralCount: { type: Number, default: 0 }, // Initial referral count
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;