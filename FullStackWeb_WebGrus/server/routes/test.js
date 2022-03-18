const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
	res.send('응답');
});

module.exports = router;
