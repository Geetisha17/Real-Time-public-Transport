const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.listen(8000,()=>console.log(`Server is starting at port 8000`));