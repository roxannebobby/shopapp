const express = require('express');
const router = express.Router();

const { sayHi } = require('../controllers/user');

// routes using router file
// router.get('/', (req, res) => {
// 	res.send('hello from node router');
// });

// routes using controller **not working yet**
router.get('/', sayHi);

module.exports = router;
