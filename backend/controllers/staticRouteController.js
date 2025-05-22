const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

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

  const routeName = routesMap[routeId];
  if (routeName) {
    res.json({ routeId, routeName });
  } else {
    res.status(404).json({ error: 'Route not found' });
  }
};

exports.getNearestStop = async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) return res.status(400).json({ error: 'lat/lng required' });

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
    .on('end', () => {
      if (closest) {
        res.json({ stopId: closest.stop_id, stopName: closest.stop_name });
      } else {
        res.status(404).json({ error: 'No nearby stop found' });
      }
    });
};