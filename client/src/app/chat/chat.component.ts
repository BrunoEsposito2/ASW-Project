import {AfterViewInit, Component, OnInit} from '@angular/core';
import { io } from 'socket.io-client';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  template: `
    <section id="chat">
      <div class="card-group">
        <div class="chat-component">
          <div class="card card-body">
            <div class="chatbox">
              <div class="user-list">
                <h2>User List</h2>
                <div class="user" *ngFor="let user of userList" [ngClass]="{'active': user === activeUser}">
                  <div class="user-indicator"></div>
                  <p>{{ user }}</p>
                </div>
              </div>
              <div class="messages-list">
                <div class="message" *ngFor="let msg of messageList" [ngClass]="{'mine': msg.mine}">
                  <div class="message-box">
                    <p class="name">{{ msg.userName }}</p>
                    <br />
                    <p class="content">{{ msg.message }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="send-message">
              <mat-form-field>
                <input matInput type="text" [(ngModel)]="message" placeholder="Type a message" />
              </mat-form-field>
              <button mat-raised-button color="primary" (click)="sendMessage()">Send</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent {
  userName = "";
  message = "";
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: string[] = [];
  socket: any;
  activeUser: string = "";

  constructor(private activatedRoute: ActivatedRoute) {
    this.userNameUpdate(this.activatedRoute.snapshot.paramMap.get('username') !);
  }

  userNameUpdate(name: string): void {
    this.socket = io(`http://localhost:3000?userName=${name}`);
    this.userName = name;

    this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
      this.activeUser = userList.filter(value => value == this.userName)[0];
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