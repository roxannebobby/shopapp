const express = require('express');
const router = express.Router();

const {
	signup,
	signin,
	signout,
	requireSignin,
} = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

// routes using router file
// router.get('/', (req, res) => {
// 	res.send('hello from node router');
// });

// routes using controller
router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;
