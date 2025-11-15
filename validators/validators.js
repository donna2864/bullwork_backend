const { body } = require('express-validator');

const registerValidation = [
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').optional().isIn(['admin','user'])
];

const loginValidation = [
  body('email').isEmail(),
  body('password').exists()
];

const vehicleValidation = [
  body('make').notEmpty(),
  body('model').notEmpty(),
  body('regNumber').notEmpty()
];

module.exports = { registerValidation, loginValidation, vehicleValidation };
