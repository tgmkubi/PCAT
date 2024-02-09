const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connection Successfull...');
  } catch (error) {
    throw error;
  }
};

module.exports = connectDatabase;
