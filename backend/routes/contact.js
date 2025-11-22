const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST new contact message
router.post('/', async (req, res) => {
  const contact = new Contact(req.body);
  try {
    const newContact = await contact.save();
    res.status(201).json({ message: 'Message sent successfully', contact: newContact });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all messages (for admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
