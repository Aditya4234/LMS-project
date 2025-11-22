const express = require('express');
const router = express.Router();

// GET profile (Mock)
router.get('/', async (req, res) => {
  res.json({
    name: 'Aditya',
    email: 'aditya@example.com',
    role: 'Admin',
    avatar: 'https://via.placeholder.com/150'
  });
});

// PUT profile
router.put('/', async (req, res) => {
  res.json({ message: 'Profile updated', profile: req.body });
});

module.exports = router;
