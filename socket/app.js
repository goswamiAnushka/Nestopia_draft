const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://668e27567494d4801c5432bd--joyful-monstera-323e05.netlify.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

// Enable CORS for your client origin
app.use(cors({
  origin: 'https://668e27567494d4801c5432bd--joyful-monstera-323e05.netlify.app',
  credentials: true,
}));

// Your other server code...
io.on('connection', (socket) => {
  console.log('A user connected');
  // Your socket event handlers...
});

server.listen(4000, () => {
  console.log('Listening on port 4000');
});
