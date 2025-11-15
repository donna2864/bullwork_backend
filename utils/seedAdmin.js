require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

async function seed() {
  await connectDB(process.env.MONGO_URI);
  const adminEmail = 'admin@demo.com';
  const exists = await User.findOne({ email: adminEmail });
  if (exists) {
    console.log('Admin already exists:', adminEmail);
    process.exit(0);
  }
  const admin = new User({
    name: 'Demo Admin',
    email: adminEmail,
    password: 'Admin@123', // demo password
    role: 'admin'
  });
  await admin.save();
  console.log('Admin created. Email:', adminEmail, 'Password: Admin@123');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
