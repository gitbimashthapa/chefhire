const express = require('express');
const router = express.Router();

// Import API routes
const authRoutes = require('./api/auth');
const chefRoutes = require('./api/chefs');
const userRoutes = require('./api/users');

// Use API routes
router.use('/auth', authRoutes);
router.use('/chefs', chefRoutes);
router.use('/users', userRoutes);

module.exports = router;