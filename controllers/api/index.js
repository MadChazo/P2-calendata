const router = require('express').Router();

const userRoutes = require('./user-routes');
const userRoutes = require('./event-routes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;