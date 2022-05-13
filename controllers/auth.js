const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // auth check
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
	console.log('req.body', req.body);
	const user = new User(req.body);
	user.save((err, user) => {
		if (err) {
			return res.status(400).json({
				err: errorHandler(err),
			});
		}

		user.salt = undefined;
		user.hashed_password = undefined;

		res.json({
			user,
		});
	});
};

exports.signin = (req, res) => {
	// find user by email address
	const { email, password } = req.body;
	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				err: 'User with that email does not exist. Please sign up.',
			});
		}
		// auth the user if email is found
		// create authenticate method in user model also
		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: 'Email and password do not match',
			});
		}
		// generate a signed token with user id and secret
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
		// persist the token as 't' in cookie with expiry date
		res.cookie('t', token, { expire: new Date() + 9999 });
		// return response with user and token to frontend client
		const { _id, name, email, role } = user;
		return res.json({ token, user: { _id, email, name, role } });
	});
};

exports.signout = (req, res) => {
	res.clearCookie('t');
	res.json({ message: 'Signout successful' });
};

exports.requireSignin = expressJwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'], // added later
	userProperty: 'auth',
});
