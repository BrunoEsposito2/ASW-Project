import {Socket} from "socket.io";
import express from "express";

const PORT = 3000

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.send('Heello world');
})

let userList = new Map();

io.on('connection', (socket: Socket) => {
    let userName = socket.handshake.query.userName;
    addUser(userName, socket.id);

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    // Listen for the 'message' event from the client
    socket.on('message', (msg) => {
        socket.broadcast.emit('message-broadcast', {message: msg, userName: userName});
    });

    socket.on('disconnect', () => {
        removeUser(userName, socket.id);
    });
});

http.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running ${process.env.PORT || PORT}`);
});

function addUser(username: string | string[], id: String) {
    if(!userList.has(username)) {
        userList.set(username, new Set(id));
    } else {
        userList.get(username).add(id);
    }
}

function removeUser(username: string | string[], id: String) {
    if (userList.has(username)) {
        let userIDs = userList.get(username);
        if (userIDs.size == 0) {
            userList.delete(username);
        }
    }
}
