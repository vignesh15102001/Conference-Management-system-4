const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/ConferenceManagementTest";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB...');
  } catch (err) {
    console.error('Could not connect to MongoDB...', err);
  }

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
};

module.exports = connectDB;
