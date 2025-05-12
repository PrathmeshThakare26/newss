const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

app.use('/api/news', require('./routes/news')); // ✅ This line is key

// Emit fake news every 30s (for demo)
setInterval(() => {
  const sampleNews = {
    title: "🔴 Live Update",
    description: "This is a real-time demo article.",
    publishedAt: new Date().toISOString()
  };
  io.emit('newNews', sampleNews);
}, 30000);

const port = 5001;  // Change this to any available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


