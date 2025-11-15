const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const authenticate = require('../middleware/auth');
const { permit } = require('../middleware/roles');
const { vehicleValidation } = require('../validators/validators');
const { validationResult } = require('express-validator');

// Create vehicle (admin only)
router.post('/', authenticate, permit('admin'), vehicleValidation, async (req, res) => {
  const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { make, model, regNumber, color } = req.body;
    const exists = await Vehicle.findOne({ regNumber });
    if (exists) return res.status(409).json({ error: 'Vehicle with this registration number already exists' });
    const v = new Vehicle({ make, model, regNumber, color });
    await v.save();
    res.status(201).json(v);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// List vehicles (admin only)
router.get('/', authenticate, permit('admin'), async (req, res) => {
  const vehicles = await Vehicle.find().populate('assignedTo', 'name email role').lean();
  res.json(vehicles);
});

// Get one vehicle (admin only)
router.get('/:id', authenticate, permit('admin'), async (req, res) => {
  const v = await Vehicle.findById(req.params.id).populate('assignedTo', 'name email role');
  if (!v) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(v);
});

// Update vehicle (admin)
router.put('/:id', authenticate, permit('admin'), async (req, res) => {
  const { id } = req.params;
  const update = (({ make, model, regNumber, color }) => ({ make, model, regNumber, color }))(req.body);
  try {
    const v = await Vehicle.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!v) return res.status(404).json({ error: 'Vehicle not found' });
    res.json(v);
  } catch (err) { res.status(500).json({ error: 'Server error' }); }
});

// Delete vehicle (admin)
router.delete('/:id', authenticate, permit('admin'), async (req, res) => {
  const v = await Vehicle.findByIdAndDelete(req.params.id);
  if (!v) return res.status(404).json({ error: 'Vehicle not found' });
  res.json({ message: 'Vehicle deleted' });
});

module.exports = router;
