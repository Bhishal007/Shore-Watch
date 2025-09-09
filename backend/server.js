const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const reportRouter = require('./routes/report');

dotenv.config();

connectDB(); // Connect to MongoDB Atlas

const app = express();

app.use(cors());
app.use(express.json());

// Use Auth and Report Routes
app.use('/auth', authRouter);
app.use('/report', reportRouter);


// Serve uploads statically (for testing media)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send('Shore Watch Backend is Running with MongoDB Atlas!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Shore Watch Backend is running on port ${PORT}`);
});

module.exports = app; // Export app for testing