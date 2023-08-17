//Basic modules
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const routes = require('./src/routes/routes');
require('dotenv').config();
const cors = require('cors');


// Security Modules
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('mongo-sanitize');
const hpp = require('hpp');

// Use built-in body parsing middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded







// Security module implement
app.use(helmet());
app.use(hpp());
// Mongo-sanitize
app.use((req, res, next) => {
  // Sanitize request body and query parameters
  req.body = mongoSanitize(req.body);
  req.query = mongoSanitize(req.query);
  next();
});

// Apply rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);





// MongoDB Connection
mongoose.connect('mongodb+srv://iftekhar:admin1234@cluster0.s6snx6k.mongodb.net/blog-project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection error:', error));


app.use(express.json());
app.use('/api/v1', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});