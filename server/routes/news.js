const express = require('express');
const router = express.Router();
const axios = require('axios');

const GNEWS_API_KEY = 'be4548607fd7d6e2271ac79245486a04';

const categoryMap = {
  general: 'general',
  sports: 'sports',
  technology: 'technology',
  healthcare: 'health',
  political: 'politics',
  business: 'business',
  science: 'science',
  entertainment: 'entertainment',
};

router.get('/', async (req, res) => {
  let category = req.query.category || 'general';
  const query = categoryMap[category.toLowerCase()] || 'general';

  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: query,
        lang: 'en',
        country: 'us',
        max: 10,
        apikey: GNEWS_API_KEY
      },
      headers: {
        'Cache-Control': 'no-cache',
      }
    });

    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching news from GNews:', error.message);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

module.exports = router;
