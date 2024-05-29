const router = require('express').Router();
const apiRoutes = require('./api/noteRoutes.js');

router.use('/api', apiRoutes);

module.exports = router;