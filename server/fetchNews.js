const axios = require('axios');
const News = require('./routes/news');

const fetchAndStoreNews = async (io) => {
  try {
    const { data } = await axios.get(
      `https://gnews.io/api/v4/top-headlines?country=in&lang=en&max=20&apikey=${process.env.GNEWS_API_KEY}`
    );

    for (const item of data.articles) {
      const exists = await News.findOne({ title: item.title });
      if (!exists) {
        const newArticle = new News({
          title: item.title,
          description: item.description,
          url: item.url,
          urlToImage: item.image, // GNews uses 'image' instead of 'urlToImage'
          publishedAt: item.publishedAt,
          category: 'general',
        });
        await newArticle.save();
        io.emit('new_news', newArticle);
      }
    }
  } catch (err) {
    console.error('News Fetch Error:', err.message);
  }
};

module.exports = fetchAndStoreNews;
