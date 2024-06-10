import {Socket} from "socket.io";
import express from "express";
import {ChatMessage} from "./models/chat-message";
import {getBroadcastHistory, getRoomHistory, storeMessage} from "./models/store-messages";

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
    res.send('Chat server is activated');
})

let userList = new Map();
let messageList: ChatMessage[] = [];
let messageRoomList: ChatMessage[] = [];

if (!fs.existsSync('chat-messages.json')) {
    fs.writeFileSync('chat-messages.json', '[]');
} else {
    messageList = JSON.parse(fs.readFileSync('chat-messages.json', 'utf8'));
}

io.on('connection', (socket: Socket) => {
    let room: string = ""
    let receiverName: string = ""
    let userName = socket.handshake.query.userName;
    addUser(userName, socket.id);

    socket.join(userName)

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    // Listen for the 'message' event from the client
    socket.on('message', (msg) => {
        msg.color = getRandomColor()
        messageList.push(msg)
        storeMessage(msg.userName, "all", msg.message, new Date().toISOString()).catch(err => console.error(err))
        socket.broadcast.emit('message-broadcast', {message: msg.message, userName: msg.userName, color: msg.color});
    });

    socket.on('history', async (username) => {
        try {
            messageList = await getBroadcastHistory()
            socket.emit('chat-messages', [...messageList])
        } catch (e) {
            console.error(e.message)
        }
    })

    socket.on('joinRoom', async (sender: string, receiver: string) => {
        let sortedNames: string[] = [sender, receiver]
        sortedNames.sort()
        room = sortedNames[0] + "-" + sortedNames[1]
        try {
            messageRoomList = await getRoomHistory(sender, receiver)
            socket.to(userName).emit('joinedRoom', room, [...messageRoomList])
        } catch (e) {
            console.error(e.message)
        }
    })

    socket.on('room-message', (msg) => {
        storeMessage(msg.userName, msg.receiver, msg.message, new Date().toISOString()).catch(err => console.error(err))
        msg.color = getRandomColor()
        messageRoomList.push(msg)
        socket.to(msg.receiver).emit('room-message', room, [...messageRoomList])
    })

    socket.on('disconnect', () => {
        removeUser(userName, socket.id);
        socket.broadcast.emit('user-list', [...userList.keys()])
    });
});

http.listen(process.env.PORT || PORT, () => {
    console.log(`Chat server is running ${process.env.PORT || PORT}`);
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
