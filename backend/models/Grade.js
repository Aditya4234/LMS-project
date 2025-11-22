const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  assignment: String,
  grade: {
    type: String, // e.g., 'A', 'B+', '95%'
    required: true
  },
  score: {
    type: Number,
    required: false
  },
  remarks: String
}, { timestamps: true });

module.exports = mongoose.model('Grade', GradeSchema);
