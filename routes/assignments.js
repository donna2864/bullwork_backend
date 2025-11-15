const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');
const authenticate = require('../middleware/auth');
const { permit } = require('../middleware/roles');

// Assign vehicle to user (admin)
router.post('/vehicles/:id/assign', authenticate, permit('admin'), async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'userId required' });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const vehicle = await Vehicle.findById(id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

  if (vehicle.assignedTo && vehicle.assignedTo.toString() === userId) {
    return res.status(400).json({ error: 'Vehicle already assigned to this user' });
  }
  vehicle.assignedTo = user._id;
  await vehicle.save();
  res.json({ message: 'Vehicle assigned', vehicle });
});

// Unassign vehicle (admin)
router.post('/vehicles/:id/unassign', authenticate, permit('admin'), async (req, res) => {
  const { id } = req.params;
  const vehicle = await Vehicle.findById(id);
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  if (!vehicle.assignedTo) return res.status(400).json({ error: 'Vehicle is not assigned' });

  vehicle.assignedTo = null;
  await vehicle.save();
  res.json({ message: 'Vehicle unassigned', vehicle });
});

// Get vehicles for a specific user (admin)
router.get('/users/:userId/vehicles', authenticate, permit('admin'), async (req, res) => {
  const { userId } = req.params;
  const vehicles = await Vehicle.find({ assignedTo: userId }).populate('assignedTo', 'name email');
  res.json(vehicles);
});

// Get my vehicles (both roles; user sees only own vehicles; admin may use this to check their vehicles too)
router.get('/my/vehicles', authenticate, async (req, res) => {
  const userId = req.user.id;
  const vehicles = await Vehicle.find({ assignedTo: userId }).populate('assignedTo', 'name email');
  res.json(vehicles);
});

// User profile (current)
router.get('/my/profile', authenticate, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
