const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String, required: [true, 'Student name is required'], trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name must be at most 100 characters long'],
  },
  email: {
    type: String, required: [true, 'Student email is required'], trim: true, lowercase: true,
    maxlength: [254, 'Email is too long'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address'],
  },
  // Number matches the lab schema. Use a country code (639...) to avoid leading-zero loss.
  phone: {
    type: Number, required: [true, 'Student phone number is required'],
    validate: {
      validator: value => Number.isSafeInteger(value) && value >= 1000000 && value <= 999999999999999,
      message: 'Phone must contain 7 to 15 digits and must be positive',
    },
  },
}, { collection: 'students', timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
