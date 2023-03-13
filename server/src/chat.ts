import { Server } from "socket.io";

const io = new Server(4200);

let userList = new Map();


io.on('connection', (socket) => {
    let userName = socket.handshake.query.userName;
    addUser(userName, socket.id);

    socket.broadcast.emit('user-list', [...userList.keys()]);
    socket.emit('user-list', [...userList.keys()]);

    // Listen for the 'message' event from the client
    socket.on('message', (message) => {
        socket.broadcast.emit('message-broadcast', {message: message, userName: userName});
    });

    socket.on('disconnect', (reason) => {
        removeUser(userName, socket.id);
    });
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
