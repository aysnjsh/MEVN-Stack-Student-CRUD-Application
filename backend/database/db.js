const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);
mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected; waiting for reconnection.'));
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected.'));

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/finals_mevn_db';
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log(`MongoDB connected: ${mongoose.connection.name}`);
}

module.exports = connectDB;
