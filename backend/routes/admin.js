const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Import all models
const User = require('../models/User');
const Course = require('../models/Course');
const Student = require('../models/Student');
const Instructor = require('../models/Instructor');
const Assignment = require('../models/Assignment');
const Attendance = require('../models/Attendance');
const Grade = require('../models/Grade');
const Announcement = require('../models/Announcement');
const Contact = require('../models/Contact');

// Get all collections and their data
router.get('/collections', async (req, res) => {
  try {
    const collections = {
      users: await User.find().limit(100),
      courses: await Course.find().limit(100),
      students: await Student.find().limit(100),
      instructors: await Instructor.find().limit(100),
      assignments: await Assignment.find().limit(100),
      attendance: await Attendance.find().limit(100),
      grades: await Grade.find().limit(100),
      announcements: await Announcement.find().limit(100),
      contacts: await Contact.find().limit(100)
    };

    const stats = {
      users: await User.countDocuments(),
      courses: await Course.countDocuments(),
      students: await Student.countDocuments(),
      instructors: await Instructor.countDocuments(),
      assignments: await Assignment.countDocuments(),
      attendance: await Attendance.countDocuments(),
      grades: await Grade.countDocuments(),
      announcements: await Announcement.countDocuments(),
      contacts: await Contact.countDocuments()
    };

    res.json({ collections, stats });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collections', error: error.message });
  }
});

// Get specific collection data
router.get('/collection/:name', async (req, res) => {
  try {
    const { name } = req.params;
    let data;

    switch(name) {
      case 'users': data = await User.find(); break;
      case 'courses': data = await Course.find(); break;
      case 'students': data = await Student.find(); break;
      case 'instructors': data = await Instructor.find(); break;
      case 'assignments': data = await Assignment.find(); break;
      case 'attendance': data = await Attendance.find(); break;
      case 'grades': data = await Grade.find(); break;
      case 'announcements': data = await Announcement.find(); break;
      case 'contacts': data = await Contact.find(); break;
      default: return res.status(404).json({ message: 'Collection not found' });
    }

    res.json({ collection: name, count: data.length, data });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collection', error: error.message });
  }
});

// Delete document from collection
router.delete('/collection/:name/:id', async (req, res) => {
  try {
    const { name, id } = req.params;
    let result;

    switch(name) {
      case 'users': result = await User.findByIdAndDelete(id); break;
      case 'courses': result = await Course.findByIdAndDelete(id); break;
      case 'students': result = await Student.findByIdAndDelete(id); break;
      case 'instructors': result = await Instructor.findByIdAndDelete(id); break;
      case 'assignments': result = await Assignment.findByIdAndDelete(id); break;
      case 'attendance': result = await Attendance.findByIdAndDelete(id); break;
      case 'grades': result = await Grade.findByIdAndDelete(id); break;
      case 'announcements': result = await Announcement.findByIdAndDelete(id); break;
      case 'contacts': result = await Contact.findByIdAndDelete(id); break;
      default: return res.status(404).json({ message: 'Collection not found' });
    }

    res.json({ message: 'Document deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
});

// Database stats
router.get('/stats', async (req, res) => {
  try {
    const stats = {
      database: 'lms',
      connected: mongoose.connection.readyState === 1,
      collections: {
        users: await User.countDocuments(),
        courses: await Course.countDocuments(),
        students: await Student.countDocuments(),
        instructors: await Instructor.countDocuments(),
        assignments: await Assignment.countDocuments(),
        attendance: await Attendance.countDocuments(),
        grades: await Grade.countDocuments(),
        announcements: await Announcement.countDocuments(),
        contacts: await Contact.countDocuments()
      }
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
});

module.exports = router;
