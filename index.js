const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');

const { Server } = require('socket.io');
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static(path.resolve('./public')));

// Socket.io setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('User message', (message) => {
        console.log('New User message:', message);
        io.emit('message',message)
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

});

// Route to serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html')); // Use path.resolve for consistent file path resolution
});

// Start the server
server.listen(9000, () => {
    console.log('Server started at port no 9000');
});
