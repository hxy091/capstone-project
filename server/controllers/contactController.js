import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const newMessage = await Message.create({ name, email, message });
  res.status(201).json({ message: 'Message sent successfully', data: newMessage });
});

export { sendMessage };
