const CrowdReport = require('../models/CrowdReport');

exports.submitCrowdReport = async (req, res) => {
  try {
    const report = new CrowdReport(req.body);
    const saved = await report.save();
    return res.json(saved);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Failed to submit report' });
  }
};

exports.getCrowdData = async (req, res) => {
  const { routeId, stopName } = req.query;

  try {
    if (routeId) {
      const reports = await CrowdReport.find({ routeId });
      return res.json(reports);
    }
    if (stopName) {
      const reports = await CrowdReport.find({ stopName });
      return res.json(reports);
    }
    return res.status(400).json({ error: 'Provide routeId or stopName' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Failed to fetch crowd data' });
  }
};


