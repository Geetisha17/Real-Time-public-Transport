const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const redisClient = require('../config/redisClient');

const stopsPath = path.join(__dirname, '../DMRC_GTFS/stops.txt');
const routesPath = path.join(__dirname, '../DMRC_GTFS/routes.txt');

let routesMap = {};

fs.createReadStream(routesPath)
  .pipe(csv())
  .on('data', (row) => {
    routesMap[row.route_id] = row.route_long_name || row.route_short_name;
  });

exports.getRouteInfo = async (req, res) => {
  const { routeId } = req.query;
  if (!routeId) return res.status(400).json({ error: 'routeId required' });

  try {
    const cached = await redisClient.get(`route:${routeId}`);
    if (cached) return res.json(JSON.parse(cached));

    const routeName = routesMap[routeId];
    if (routeName) {
      const result = { routeId, routeName };
      await redisClient.set(`route:${routeId}`, JSON.stringify(result));
      res.json(result);
    } else {
      res.status(404).json({ error: 'Route not found' });
    }
  } catch (err) {
    console.error('Redis route cache error:', err.message);
    res.status(500).json({ error: 'Failed to get route' });
  }
};

exports.getNearestStop = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat/lng required' });

  const cacheKey = `stop:${lat.toFixed(4)},${lng.toFixed(4)}`;
  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    let closest = null;
    let minDist = Number.MAX_VALUE;

    fs.createReadStream(stopsPath)
      .pipe(csv())
      .on('data', (row) => {
        const stopLat = parseFloat(row.stop_lat);
        const stopLon = parseFloat(row.stop_lon);
        const d = Math.sqrt((stopLat - lat) ** 2 + (stopLon - lng) ** 2);
        if (d < minDist) {
          minDist = d;
          closest = row;
        }
      })
      .on('end', async () => {
        if (closest) {
          const response = {
            stopId: closest.stop_id,
            stopName: closest.stop_name,
          };
          await redisClient.set(cacheKey, JSON.stringify(response));
          res.json(response);
        } else {
          res.status(404).json({ error: 'No nearby stop found' });
        }
      });
  } catch (err) {
    console.error('Redis stop cache error:', err.message);
    res.status(500).json({ error: 'Failed to get stop' });
  }
};