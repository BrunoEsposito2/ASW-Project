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
  messageListObservable: Observable<ChatMessage[]> = new Observable<ChatMessage[]>();
  message: string = "";

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
      this.messageListObservable.subscribe(list => this.messageList = messageList)
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
      this.message = "";
    }
  }

  filteredUserList() {
    return this.userList.filter(u => u != this.activeUser)
  }

  disconnect(): void {
    this.socket.disconnect()
  }
}
