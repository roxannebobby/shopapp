const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

require('dotenv').config();

// import routes
const userRoutes = require('./routes/user');

// app
const app = express();

// db
mongoose
	.connect(process.env.MONGO_URI, {})
	.then(() => console.log('MONGO Cloud DB Connected'));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

// routes middleware
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
