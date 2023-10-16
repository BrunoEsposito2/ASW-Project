import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { io } from 'socket.io-client';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat',
  template: `
    <section id="chat">
      <div class="container py-5">
        <div class="row">
          <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
            <h5 class="font-weight-bold mb-3 text-center text-lg-start">Company Users List</h5>
            <div class="card border border-dark mb-3">
              <div class="card-body" style="position: relative; height: 700px; overflow-y: scroll;">
                <ul class="user-list mb-0">
                  <li class="user p-2 border-bottom" *ngFor="let user of userList" [ngClass]="{'active': user === activeUser}">
                    <div class="d-flex flex-row">
                      <p class="user-indicator rounded-circle d-flex align-self-center me-3 shadow-1-strong"></p>
                      <div class="pt-1">
                        <p class="fw-bold mb-0">{{ user }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-7 col-xl-8">
            <div class="card border border-dark mb-3">
              <div class="card-body" style="position: relative; height: 600px; overflow-y: scroll;" #chatMessages>
                <div class="message" *ngFor="let msg of messageList" [ngClass]="{'mine': msg.mine}">
                  <div class="message-box">
                    <div class="card border border-dark mb-3" style="min-width: 200px; max-width: 550px; min-height: 100px; max-height: 400px;">
                      <div class="card-header d-flex justify-content-between p-3">
                        <p class="name fw-bold mb-0">{{ msg.userName }}</p>
                      </div>
                      <div class="card-body">
                        <p class="content mb-0">{{ msg.message }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer border-black">
                <div class="send-message text-muted d-flex justify-content-start align-items-center p-3">
                  <textarea matInput type="text" class="form-control form-control-lg" style="resize: none;" (keyup.enter)="sendMessage()" [(ngModel)]="message" placeholder="Type a message"></textarea>
                  <button class="btn btn-info btn-rounded float-end" type="button" (click)="sendMessage()">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

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
      if (data && data.message !== "") {
        this.messageList.push({message: data.message, userName: data.userName, mine: false});
      }
    });
  }

  sendMessage(): void {
    const regex = /^(\n|''| .*)/;
    if (!regex.test(this.message)) {
      this.socket.emit('message', this.message);
      this.messageList.push({message: this.message, userName: this.userName, mine: true});
      this.message = "";
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
  }
}