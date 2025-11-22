const express = require('express');
const router = express.Router();

// GET reports data (Mock data for now, or aggregation later)
router.get('/', async (req, res) => {
  res.json({
    totalStudents: 120,
    totalCourses: 15,
    activeInstructors: 8,
    revenue: 50000,
    recentActivity: [
      { action: 'New Student Registered', time: '2 mins ago' },
      { action: 'Course "React Basics" updated', time: '1 hour ago' }
    ]
  });
});

module.exports = router;
