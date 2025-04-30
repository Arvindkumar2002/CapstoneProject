const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const mlResponse = await axios.post('http://127.0.0.1:5000/predict', req.body);
    res.json({ prediction: mlResponse.data.prediction });
  } catch (error) {
    console.error('Error communicating with ML model:', error.message);
    res.status(500).json({ error: 'ML service failed' });
  }
});

module.exports = router;
