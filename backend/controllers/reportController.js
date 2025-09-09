const { body, validationResult } = require('express-validator');
const multer = require('multer');
const Report = require('../models/report');
const sendEmail = require('../utils/sendEmail');
const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

exports.submitReport = [
  authMiddleware,
  upload.single('media'),
  [
    body('description').notEmpty().withMessage('Description is required'),
    body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
    body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
    body('urgency').isIn(['low', 'medium', 'high']).withMessage('Urgency must be low, medium, or high'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, latitude, longitude, urgency } = req.body;
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
      const report = new Report({
        userId: req.user.id,
        description,
        latitude: parseFloat(latitude), // Ensure numeric with full precision
        longitude: parseFloat(longitude), // Ensure numeric with full precision
        mediaUrl,
        urgency,
      });
      await report.save();

      res.status(201).json({ message: 'Report submitted successfully', reportId: report._id });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];

exports.getAllReports = [
  authMiddleware,
  async (req, res) => {
    try {
      const reports = await Report.find().populate('userId', 'email role');
      res.json(reports);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];

exports.getHotspots = [
  authMiddleware,
  async (req, res) => {
    try {
      const hotspots = await Report.aggregate([
        {
          $group: {
            _id: {
              lat: '$latitude', // Group by numeric values
              lon: '$longitude',
            },
            count: { $sum: 1 },
            reports: { $push: '$_id' },
            urgency: { $max: '$urgency' },
          },
        },
        {
          $project: {
            _id: 0,
            latitude: '$_id.lat',
            longitude: '$_id.lon',
            count: 1,
            reports: 1,
            urgency: 1,
          },
        },
      ]).sort({ count: -1 });

      const highRiskHotspots = hotspots.filter(hotspot => hotspot.count >= 2);
      if (highRiskHotspots.length > 0) {
        const officialEmail = 'official@example.com'; // Replace with actual official email
        const message = `Alert: ${highRiskHotspots.length} hotspots detected with 2+ reports.\nDetails: ${JSON.stringify(highRiskHotspots, null, 2)}`;
        await sendEmail(officialEmail, 'Shore Watch Hotspot Alert', message);
      }

      res.json(hotspots);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  },
];