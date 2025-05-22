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
app.use('/api/suggestions', require('./routes/suggestions'));
app.use('/api/crowd', require('./routes/crowd'));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));