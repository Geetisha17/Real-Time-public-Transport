const Alert = require('../models/Alerts');

exports.createAlert = async (req, res) => {
  try {
    const { type, message, location } = req.body;
    const alert = new Alert({ type, message, location });
    const saved = await alert.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(50);
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};