import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {ChatMessage} from "../app/chat-message";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "platform"
})

export class SocketChatService {
  socket: any
  userList: string[] = [];
  userName: string = "";
  activeUser: string = "";
  messageList: ChatMessage[] = []
  messageRooms: Map<string, ChatMessage[]> = new Map<string, ChatMessage[]>();
  message: string = "";
  receiver: string = "";

  constructor() {   }

  openConnections(name: string) {
    this.userName = name;

    this.socket = io(`http://localhost:3000?userName=${this.userName}`);

    this.socket.emit('set-user-name', this.userName);
    this.socket.emit('history');

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
      this.activeUser = userList.filter(value => value == this.userName)[0];
    });

    this.socket.on('message-broadcast', (data: {message: string, userName: string, color: string}) => {
      if (data && data.message !== ""
          && this.messageList.filter(value => value.message == data.message && value.userName == data.userName)
              .length == 0) {
        this.messageList.push(data)
      }
    });

    this.socket.on('chat-messages', (messageList: ChatMessage[]) => {
      this.messageList = messageList
    })

    this.socket.on('joinedRoom', (room: string, messageList: ChatMessage[]) => {
      this.messageRooms.set(room, messageList)
    })

    this.socket.on('room-message', (room: string, data: ChatMessage[]) => {
      this.messageRooms.set(room, data)
    })
  }

  sendMessage(): void {
    const regex = /^(\n|''| .*)/;
    if (!regex.test(this.message)) {
      const msgToSend = {message: this.message, userName: this.userName, color: ""}
      this.socket.emit('message', msgToSend);
      this.messageList.push(msgToSend)
      this.message = "";
    }
  }


  sendMessageWarningOrAlert(message: string): void {
    const regex = /^(\n|''| .*)/;
    if (!regex.test(message)) {
      const msgToSend = {message: message, userName: this.userName, color: ""}
      this.socket.emit('message', msgToSend);
      this.messageList.push(msgToSend);
    }
  }

  sendRoomMessage(): void {
    const regex = /^(\n|''| .*)/;
    if (!regex.test(this.message)) {
      const msgToSend = {message: this.message, userName: this.userName, color: ""}
      this.socket.emit('room-message', msgToSend);


      const roomId = this.getRoomId()
      if (this.messageRooms.has(roomId)) {
        const existingMessages = this.messageRooms.get(roomId)
        if (existingMessages != undefined) {
          existingMessages.push(msgToSend)
          this.messageRooms.set(roomId, existingMessages)
        }
      }
      this.message = "";
    }
  }

  getRoomId(): string {
    return [this.userName, this.receiver].sort().toString().replace(",", "_")
  }

  sendBroadcastHistoryRequest() {
    this.receiver = ''
    this.socket.emit('history')
  }

  sendHistoryRequest(username: string) {
    this.receiver = username
    let roomName: string | string[] = [this.userName, this.receiver]
    this.socket.emit('joinRoom', roomName.sort().toString().replace(",", "_"), this.receiver);
  }

  filteredUserList() {
    return this.userList.filter(u => u != this.activeUser)
  }

  disconnect(): void {
    this.socket.disconnect()
  }
}
