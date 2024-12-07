"use strict";
import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
// const messages = [];
const roomsMap = new Map();
app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);
    io.on('connection', (socket) => {
        console.log(`user connected: ${socket.id}`);
        socket.on('join-room', ({ room, username }) => {
            console.log(`room: ${room}, username: ${username}`);
            socket.join(room);
            console.log(`${username} joined room ${room}`);
            socket.to(room).emit('join-notification', `${username} joined the room`);
            if (roomsMap.has(room)) {
                // socket.emit('message', roomsMap.get(room));
                roomsMap.get(room).forEach(({ sender, message }) => {
                    socket.emit('message', { sender, message });
                });
            }
        });
        socket.on('message', ({ room, message, sender }) => {
            if (roomsMap.has(room)) {
                roomsMap.get(room).push({ sender, message });
            }
            else {
                roomsMap.set(room, [{ sender, message }]);
            }
            console.log(`room: ${room}, message: ${message}, sender: ${sender}`);
            socket.to(room).emit('message', { sender, message });
        });
        socket.on('disconnect', () => {
            console.log(`user disconnected ${socket.id}`);
        });
    });
    httpServer.listen(port, () => {
        console.log(`Server is running on http://${hostname}:${port}`);
    });
});
