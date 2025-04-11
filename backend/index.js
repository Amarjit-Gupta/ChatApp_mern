const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Chat = require('./connect.js');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("joinId", async (join) => {
        socket.join(join);
        console.log(`User ${socket.id} joined join: ${join}`);

        try {
            const messages = await Chat.find({ join }).sort({ timestamp: 1 }).exec();
            socket.emit('chat', messages);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('newMessage', async (msg) => {
        try {
            const newMessage = new Chat(msg);
            await newMessage.save();
            io.to(msg.join).emit('message', msg);
        } catch (err) {
            console.log(err);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});