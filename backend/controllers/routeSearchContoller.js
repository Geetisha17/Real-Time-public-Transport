const axios = require('axios');

exports.getRoute = async (req, res) => {
  const { from, to, mode, transit_mode } = req.query;

  if (!from || !to || !mode) {
    return res.status(400).json({ error: 'From, To, and Mode are required' });
  }

  const baseUrl = `https://maps.googleapis.com/maps/api/directions/json`;
  let url = `${baseUrl}?origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&mode=${mode}&key=${process.env.GOOGLE_API_KEY}&alternatives=true`;

  if (mode === 'transit' && transit_mode) {
    url += `&transit_mode=${transit_mode}`;
  }

  try {
    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    console.error('Google API error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch route data' });
  }
};