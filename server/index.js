const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);  // Use http.createServer to ensure socket.io works properly
const io = socketIo(server, {
  cors: {
    origin: '*',  // Allow all origins (adjust for production)
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
  io.emit('newNews', sampleNews);  // Emit news to all connected clients
}, 30000);

const port = 5001;  // Change this to any available port
server.listen(port, () => {  // Use server.listen instead of app.listen
  console.log(`Server is running on port ${port}`);
});
