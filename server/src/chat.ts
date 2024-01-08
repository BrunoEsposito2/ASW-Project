import {Socket} from "socket.io";
import express from "express";
import {ChatMessage} from "./chat-message";

const PORT = 3000

const app = express();
const http = require('http').createServer(app);

const fs = require('fs')

const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});

app.get('/', (req, res) => {
    res.send('Hello world');
})

let userList = new Map();
let messageList: ChatMessage[] = [];

if (!fs.existsSync('chat-messages.json')) {
    fs.writeFileSync('chat-messages.json', '[]');
} else {
    messageList = JSON.parse(fs.readFileSync('chat-messages.json', 'utf8'));
}

io.on('connection', (socket: Socket) => {
    let userName = socket.handshake.query.userName;
    addUser(userName, socket.id);

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    // Listen for the 'message' event from the client
    socket.on('message', (msg) => {
        addMessage(msg)
        socket.broadcast.emit('message-broadcast', {message: msg.message, userName: msg.userName, color: msg.color});
    });

    socket.on('history', () => {
        const messages: ChatMessage[] = JSON.parse(fs.readFileSync('chat-messages.json', 'utf-8'))
        socket.emit('chat-messages', [...messages])
    })

    socket.on('disconnect', () => {
        removeUser(userName, socket.id);
        fs.writeFileSync('chat-messages.json', "[]")
        socket.broadcast.emit('user-list', [...userList.keys()])
    });
});

http.listen(process.env.PORT || PORT, () => {
    console.log(`Chat server is running ${process.env.PORT || PORT}`);
});

function addMessage(message: ChatMessage) {
    if (messageList.filter(msg => msg.userName == message.userName).length < 1) {
        message.color = getRandomColor()
        messageList.push(message)
    } else {
        message.color = messageList.filter(msg => msg.userName == message.userName)[0].color
        messageList.push(message)
    }
    fs.writeFileSync('chat-messages.json', JSON.stringify(messageList))
}

function addUser(username: string | string[], id: String) {
    if(!userList.has(username)) {
        userList.set(username, new Set(id));
    } else {
        userList.get(username).add(id);
    }
}

function removeUser(username: string | string[], id: String) {
    if (userList.has(username)) {
        userList.delete(username);
    }
}

function getRandomColor(): string {
    let color = '#';

    for (let i = 0; i < 3; i++) {
        // Generate random values in the range of 0-128 for darker shades
        const randomValue = Math.floor(Math.random() * 205);
        // Convert the random value to hexadecimal
        const hexValue = randomValue.toString(16).padStart(2, '0');

        color += hexValue;
    }

    return color;
}
