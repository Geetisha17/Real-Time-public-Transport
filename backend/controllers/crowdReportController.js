const CrowdReport = require('../models/CrowdReport');

exports.submitCrowdReport = async (req, res) => {
  try {
    const { stopName, crowdLevel, note } = req.body;

    if (!stopName || !crowdLevel) {
      return res.status(400).json({ error: 'Stop name and crowd level are required' });
    }

    const report = new CrowdReport({  stopName: stopName.trim().toLowerCase(), crowdLevel, note });
    const saved = await report.save();

    console.log("Saved:", saved);
    return res.json(saved);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Failed to submit report' });
  }
};

exports.getCrowdData = async (req, res) => {
  const { stopName } = req.query;

  if(!stopName) return res.status(400).json({ error: 'Stop name is required' });

  try {
    const response = await CrowdReport.find({
      stopName: { $regex: new RegExp(`^${stopName.trim()}$`, 'i') }
    });

    return res.json(response);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Failed to fetch crowd data' });
  }
};


