import {Injectable} from '@angular/core';
import {io} from "socket.io-client";
import {ChatMessage} from "../chat-message";
import {EmployeeService} from "./employee.service";
import {Employee} from "../employee";
import {UrlSegment} from "@angular/router";

@Injectable({
  providedIn: "root"
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
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {   }

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
      console.log("notifica broad");
    });

    this.socket.on('chat-messages', (messageList: ChatMessage[]) => {
      this.messageList = messageList
    })

    this.socket.on('joinedRoom', (room: string, messageList: ChatMessage[]) => {
      console.log("notifica joined");
      this.messageRooms.set(room, messageList)
    })

    this.socket.on('room-message', (room: string, data: ChatMessage[]) => {
      console.log("notifica")
      this.messageRooms.set(room, data)
    })

    this.fetchEmployees()
  }

  fetchEmployees() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees
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
      const msgToSend = {message: this.message, userName: this.userName, receiver: this.receiver, color: ""}
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
    return [this.userName, this.receiver].sort().toString().replace(",", "-")
  }

  sendBroadcastHistoryRequest() {
    this.receiver = ''
    this.socket.emit('history')
  }

  sendHistoryRequest(username: string) {
    this.receiver = username
    this.socket.emit('joinRoom', this.userName, this.receiver)
  }

  filteredUserList() {
    return this.userList.filter(u => u != this.activeUser)
  }

  getEmployeeImage(name: string): string {
    const image = this.employees.find(e => e.name == name)?.img
    return image != undefined ? image : "admin"
  }

  disconnect(): void {
    this.socket.disconnect()
  }
}
