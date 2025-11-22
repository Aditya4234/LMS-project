const express = require('express');
const router = express.Router();

// GET settings
router.get('/', async (req, res) => {
  res.json({
    theme: 'light',
    notifications: true,
    language: 'en'
  });
});

// POST settings
router.post('/', async (req, res) => {
  res.json({ message: 'Settings updated', settings: req.body });
});

module.exports = router;
