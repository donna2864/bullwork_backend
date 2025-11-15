const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/auth');
const { permit } = require('../middleware/roles');
const { registerValidation } = require('../validators/validators');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// Create user (admin)
router.post('/', authenticate, permit('admin'), registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already in use' });

    const user = new User({ name, email, password, role });
    await user.save();
    const safe = (({ _id, name, email, role }) => ({ _id, name, email, role }))(user);
    res.status(201).json(safe);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// List users
router.get('/', authenticate, permit('admin'), async (req, res) => {
  try {
    const users = await User.find(
      { role: 'user' },     // <-- filter to include only role 'user'
      '-password'           // <-- exclude password field
    ).lean();

    res.json(users);

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user
router.put('/:id', authenticate, permit('admin'), async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const update = { name, email, role };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, update, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// Delete user
router.delete('/:id', authenticate, permit('admin'), async (req, res) => {
  const { id } = req.params;
  const u = await User.findByIdAndDelete(id);
  if (!u) return res.status(404).json({ error: 'User not found' });
  res.json({ message: 'User deleted' });
});

module.exports = router;
