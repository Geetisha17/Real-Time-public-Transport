const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

exports.getNearbyTransitFromPlace = async (req, res) => {
  const { place, type } = req.query;

  if (!place) {
    return res.status(400).json({ error: 'Missing place name' });
  }

  try {
    const geoRes = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: place,
        key: GOOGLE_API_KEY,
      },
    });

    const location = geoRes.data.results?.[0]?.geometry?.location;

    if (!location) {
      return res.status(404).json({ error: 'Could not geocode location' });
    }

    const { lat, lng } = location;

    const typesMap = {
      all: ['bus_station', 'subway_station', 'train_station'],
      bus: ['bus_station'],
      metro: ['subway_station'],
      train: ['train_station'],
    };

    const selectedTypes = typesMap[type] || typesMap['all'];
    const combinedResults = [];

    for (const placeType of selectedTypes) {
      const transitRes = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: `${lat},${lng}`,
          radius: 4000,
          type: placeType,
          key: GOOGLE_API_KEY,
        },
      });

      const cleaned = transitRes.data.results.map((place) => ({
        name: place.name,
        vicinity: place.vicinity,
        type: placeType,
        location: place.geometry?.location,
      }));

      combinedResults.push(...cleaned);
    }

    res.json(combinedResults);
  } catch (error) {
    console.error('Error in geocode transit lookup:', error.message);
    res.status(500).json({ error: 'Failed to process request' });
  }
};
