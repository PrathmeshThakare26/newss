const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  imageUrl: String,
  fullArticle: String,
});

module.exports = mongoose.model('News', newsSchema);