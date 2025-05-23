const axios = require('axios');
const redisClient = require('../config/redisClient');

exports.getEmergencyPlaces = async (req, res) => {
  const { lat, lng } = req.query;
  const categories = ['hospital', 'police', 'doctor'];

  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing coordinates' });
  }

  const cacheKey = `emergency_${lat}_${lng}`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return res.json({ places: JSON.parse(cached) });
    }

    let allResults = [];

    for (const type of categories) {
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=4000&type=${type}&key=${process.env.GOOGLE_API_KEY}`;
      const response = await axios.get(url);
      allResults.push(...response.data.results);
    }

    const uniquePlaces = Array.from(
      new Map(allResults.map(p => [p.place_id, p])).values()
    ).slice(0, 10);
    await redisClient.set(cacheKey, JSON.stringify(uniquePlaces), { EX: 600 });

    res.json({ places: uniquePlaces });
  } catch (error) {
    console.error('Error fetching places:', error.message);
    res.status(500).json({ error: 'Failed to fetch emergency places' });
  }
};