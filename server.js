// Backend: server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('public'));

// Store orders in memory (for simplicity; use a database for production)
let orders = [];

// WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle new order
    socket.on('placeOrder', (order) => {
        orders.push(order);
        console.log('New order:', order);
        // Notify restaurant
        io.emit('newOrder', order);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
