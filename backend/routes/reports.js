const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Course = require('../models/Course');
const Instructor = require('../models/Instructor');

// GET reports data
router.get('/', async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalCourses = await Course.countDocuments();
    const activeInstructors = await Instructor.countDocuments();
    
    // Mock revenue for now as we don't have a Payment/Order model yet
    // Assuming a fixed price or just a placeholder calculation
    const revenue = totalStudents * 500; 

    res.json({
      totalStudents,
      totalCourses,
      activeInstructors,
      revenue,
      recentActivity: [
        { action: 'System Online', time: 'Just now' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
});

module.exports = router;
