const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  enrolled: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Inactive'],
    default: 'Active'
  },
  img: {
    type: String,
    default: 'https://i.pravatar.cc/150'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);

