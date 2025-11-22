const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Late'],
    required: true
  },
  course: String
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
