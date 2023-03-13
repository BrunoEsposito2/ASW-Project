import {Component} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  template: `
    <div class="container">
      <h1>Competent programming - Chat App</h1>
      <app-username (userNameEvent)="userNameUpdate($event)" *ngIf="!userName"></app-username>
      <div class="chatbox">
        <div class="chatbot__user-list">
          <h2>User List</h2>
          <div class="chatbox__user--active" *ngFor="let user of userList">
            <p>{{user}}</p>
          </div>
        </div>
        <div class="messages_list">
          <div class="chatbox__messages" *ngFor="let msg of messageList" [ngClass]="{mine: msg.mine}">
            <div class="user-message">
              <div class="message-box">
                <p class="name">
                  {{msg.userName}}
                </p>
                <br>
                <p class="message">
                  {{msg.message}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="send-message">
        <input type="text" [ngModel]="message">
        <button (click)="sendMessage()">Send</button>
      </div>
    </div>
  `,
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {

  userName = "";
  message = "";
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: string[] = [];
  socket: any;

  constructor() { }

  userNameUpdate(name: string): void {
    this.socket = io.io(`http://localhost:4200?userName=${name}`);
    this.userName = name;

    this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
      if (data) {
        this.messageList.push({message: data.message, userName: data.userName, mine: false});
      }
    });
  }

  sendMessage(): void {
    this.socket.emit('message', this.message);
    this.messageList.push({message: this.message, userName: this.userName, mine: true});
    this.message = "";
  }

}
