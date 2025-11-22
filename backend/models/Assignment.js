const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  course: {
    type: String, // Can be ObjectId if Course model is linked, keeping string for simplicity as per current structure
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Overdue'],
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
