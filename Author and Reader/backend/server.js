require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error('MongoDB URI not defined in environment variables');
    }
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
