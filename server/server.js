const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const bodyParser = require('body-parser');
const db = require('./config/db');
const AppError = require('./utils/AppError');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
db();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('App running');
});
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`.yellow.bold));
