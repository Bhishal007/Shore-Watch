const express = require('express');
const { submitReport, getAllReports, getHotspots } = require('../controllers/reportController');

const router = express.Router();

router.post('/submit', submitReport);
router.get('/all', getAllReports);
router.get('/hotspots', getHotspots);

module.exports = router;