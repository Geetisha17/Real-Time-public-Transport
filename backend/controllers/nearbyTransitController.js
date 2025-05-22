const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

exports.getNearbyTransit = async (req, res) => {
  const { lat, lng, type } = req.query;

  const typesMap = {
    all: ['bus_station', 'subway_station', 'train_station'],
    bus: ['bus_station'],
    metro: ['subway_station'],
    train: ['train_station'],
  };

  const selectedTypes = typesMap[type] || typesMap['all'];

  try {
    const results = [];

    for (const placeType of selectedTypes) {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
        {
          params: {
            location: `${lat},${lng}`,
            radius: 4000,
            type: placeType,
            key: GOOGLE_API_KEY,
          },
        }
      );
      results.push(...response.data.results);
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching nearby transit stations:', error.message);
    res.status(500).json({ error: 'Failed to fetch nearby transit stations' });
  }
};