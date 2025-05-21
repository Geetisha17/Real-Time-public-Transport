const axios = require('axios');
const CrowdReport = require('../models/CrowdReport');

const ROUTES = [
  { from: 'Cyberhub', to: 'Rajiv Chowk' },
  { from: 'Sector 22', to: 'Noida City Center' },
  { from: 'Home', to: 'Office' }
];

const CROWD_WEIGHT = {
  EMPTY: 1,
  OKAY: 2,
  CROWDED: 3
};

exports.getSmartSuggestions = async (req, res) => {
  try {
    const fastestRoute = await getFastestRoute();
    const leastCrowded = await getLeastCrowdedRoute();
    const alternateViaTrain = await getTrainRoute();

    const suggestions = [
      {
        title: "Fastest Route Today",
        ...fastestRoute,
        link: `/route-detail?from=${fastestRoute.from}&to=${fastestRoute.to}`
      },
      {
        title: "Least Crowded Right Now",
        ...leastCrowded,
        link: `/route-detail?from=${leastCrowded.from}&to=${leastCrowded.to}`
      },
      {
        title: "Alternate Route via Train",
        ...alternateViaTrain,
        link: `/route-detail?from=${alternateViaTrain.from}&to=${alternateViaTrain.to}`
      }
    ];

    res.json(suggestions);
  } catch (err) {
    console.error('Smart Suggestions Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
};

const getFastestRoute = async () => {
  const results = await Promise.all(
    ROUTES.map(async (route) => {
      const res = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
        params: {
          origin: route.from,
          destination: route.to,
          mode: 'transit',
          key: process.env.GOOGLE_API_KEY
        }
      });

      const duration = res.data.routes[0]?.legs[0]?.duration?.value || Infinity;
      return { ...route, estimatedTime: `${Math.round(duration / 60)} mins`, duration };
    })
  );

  return results.reduce((prev, curr) => (curr.duration < prev.duration ? curr : prev));
};

const getLeastCrowdedRoute = async () => {
  const results = await Promise.all(
    ROUTES.map(async (route) => {
      const reports = await CrowdReport.find({
        routeId: `${route.from}-${route.to}`
      });

      if (!reports.length) return { ...route, crowdScore: Infinity };

      const scoreSum = reports.reduce((sum, r) => sum + CROWD_WEIGHT[r.crowdLevel], 0);
      const avgScore = scoreSum / reports.length;

      return { ...route, crowdScore: avgScore, crowdLevel: interpretCrowd(avgScore) };
    })
  );

  return results.reduce((prev, curr) => (curr.crowdScore < prev.crowdScore ? curr : prev));
};

const getTrainRoute = async () => {
  const alt = ROUTES.find(r => r.from === 'Home' && r.to === 'Office');

  const res = await axios.get('https://maps.googleapis.com/maps/api/directions/json', {
    params: {
      origin: alt.from,
      destination: alt.to,
      mode: 'transit',
      transit_mode: 'train',
      key: process.env.GOOGLE_API_KEY
    }
  });

  return {
    from: alt.from,
    to: alt.to,
    estimatedTime: res.data.routes[0]?.legs[0]?.duration?.text || 'Unknown'
  };
};

const interpretCrowd = (avg) => {
  if (avg <= 1.5) return 'Empty';
  if (avg <= 2.2) return 'Okay';
  return 'Crowded';
};