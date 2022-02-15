const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

// Custom Modules
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

// Connect to DataBase
connectDB();

const PORT = process.env.PORT || 5002;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({});
});

// ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app is listenig on PORT ${PORT}`);
});
