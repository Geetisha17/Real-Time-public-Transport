const axios = require('axios');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

exports.getRealtimeData = async (req, res) => {
  try {
    const apiKey = process.env.OTD_API_KEY;
    const url = `https://otd.delhi.gov.in/api/realtime/VehiclePositions.pb?key=${apiKey}`;

    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });

    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    );

    const vehicles = feed.entity.map((entity) => {
      const vehicle = entity.vehicle;
      return {
        id: entity.id,
        tripId: vehicle.trip?.tripId || null,
        routeId: vehicle.trip?.routeId || null,
        latitude: vehicle.position?.latitude || null,
        longitude: vehicle.position?.longitude || null,
        speed: vehicle.position?.speed || null,
        timestamp: vehicle.timestamp?.low || null,
      };
    });

    res.json({ vehicles });
  } catch (error) {
    console.error('Error fetching real-time data:', error.message);
    res.status(500).json({ error: 'Failed to fetch real-time data' });
  }
};