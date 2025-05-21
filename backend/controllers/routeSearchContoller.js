const axios = require('axios');

exports.getRoute = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'From and To are required' });
  }

  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&mode=transit&alternatives=true&key=${process.env.GOOGLE_API_KEY}`;

  try {
    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.error('Google API error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch route data' });
  }
};