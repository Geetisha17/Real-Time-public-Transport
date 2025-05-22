const axios = require('axios');

exports.getPlaceName = async (req, res) => {
  const { lat, lng } = req.query;
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_API_KEY,
        },
      }
    );

    const results = response.data.results;
    if (results.length > 0) {
      const address = results[0].formatted_address;
      return res.json({ address });
    } else {
      return res.status(404).json({ error: 'No address found' });
    }
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch address' });
  }
};