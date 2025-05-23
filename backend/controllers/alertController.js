const Alert = require('../models/Alerts');
const redisClient = require('../config/redisClient');

exports.createAlert = async (req, res) => {
  try {
    const { type, message, location } = req.body;
    const alert = new Alert({ type, message, location });
    const saved = await alert.save();
    await redisClient.del('latest_alerts');

    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create alert' });
  }
};

exports.getAllAlerts = async (req, res) => {
  try {
    const cached = await redisClient.get('latest_alerts');
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const alerts = await Alert.find().sort({ timestamp: -1 }).limit(50);

    await redisClient.set('latest_alerts', JSON.stringify(alerts), {
      EX: 300, 
    });

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
};
