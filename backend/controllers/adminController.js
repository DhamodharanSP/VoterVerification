// backend/controllers/adminController.js
const User = require('../models/User');

exports.createPollingHead = async (req, res) => {
  try {
    // Only super admin can create polling station heads
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { username, email, password, pollingStation } = req.body;
    const user = new User({ 
      username, 
      email, 
      password, 
      pollingStation,
      role: 'polling_station_head'
    });

    await user.save();
    res.status(201).json({ message: 'Polling station head created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getPollingHeads = async (req, res) => {
  try {
    // Only super admin can view all polling station heads
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const heads = await User.find({ role: 'polling_station_head' });
    res.json(heads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};