// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const Chat = require('./connect.js');

// const PORT = process.env.PORT || 5000;

// const app = express();
// app.use(express.json());

// const server = http.createServer(app);

// const io = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// });

// io.on("connection", (socket) => {
//     console.log("User connected", socket.id);

//     socket.on("joinId", async (join) => {
//         socket.join(join);
//         console.log(`User ${socket.id} joined join: ${join}`);

//         try {
//             const messages = await Chat.find({ join }).sort({ timestamp: 1 }).exec();
//             socket.emit('chat', messages);
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     socket.on('newMessage', async (msg) => {
//         try {
//             const newMessage = new Chat(msg);
//             await newMessage.save();
//             io.to(msg.join).emit('message', msg);
//         } catch (err) {
//             console.log(err);
//         }
//     });

//     socket.on("disconnect", () => {
//         console.log("User disconnected", socket.id);
//     });
// });


// // to delete all data (https://chatapp-backend-z71v.onrender.com/del)
// app.delete("/del", async (req, res) => {
//     try {
//         let data = await Chat.deleteMany({});
//         // console.log(data);
//         res.send(data);
//     }
//     catch (err) {
//         console.log(err);
//     }
// });

// server.listen(PORT, () => {
//     console.log(`server is running on port ${PORT}`);
// });



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
        origin: "*",
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("joinId", async (roomId) => {
        if (!roomId) return;
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
        try {
            const messages = await Chat.find({ join: roomId }).sort({ timestamp: 1 }).limit(100);
            socket.emit('chat', messages);
        } catch (err) {
            console.error("Error fetching messages:", err);
        }
    });

    socket.on('newMessage', async (msg) => {
        try {
            if (!msg || !msg?.text || !msg?.join) return;
            const newMessage = new Chat(msg);
            await newMessage.save();
            io.to(msg.join).emit('message', newMessage);

        } catch (err) {
            console.error("Error saving message:", err);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});


app.delete("/del", async (req, res) => {
    try {
        const data = await Chat.deleteMany({});
        res.send({ message: "All chats deleted", data });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting data");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
