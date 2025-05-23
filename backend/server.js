const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/emergency', require('./routes/emergencyRoutes'));
app.use('/api/route', require('./routes/routeSearch'));
app.use('/api/crowd', require('./routes/crowd'));
app.use('/api/alerts', require('./routes/alertRoutes'));
app.use('/api/nearby',require('./routes/nearbyRoutes'));
app.use('/api/realtime',require('./routes/realtimeRoutes'));
app.use('/api/location', require('./routes/locationRoutes'));
app.use('/api/static', require('./routes/staticRoute'));
app.use('/api/codeName',require('./routes/getcodeNameRoutes'));

app.get('/', (req, res) => {
    res.send('Welcome to the API Server!');
  });
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));