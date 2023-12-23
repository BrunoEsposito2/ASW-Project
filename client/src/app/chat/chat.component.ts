import {
  AfterViewChecked,
  Component,
  ElementRef, OnInit,
  ViewChild
} from '@angular/core';
import { io } from 'socket.io-client';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageListService} from "../../utils/message-list.service";
import {fadeInItems} from "@angular/material/menu";
import {style} from "@angular/animations";

@Component({
  selector: 'app-chat',
  template: `
    <section id="chat">
      <div class="container shadow-3-strong rounded bg-info bg-opacity-10 mb-2 pb-4 py-4">
        <div class="row col-sm-auto col-md-auto col-lg-auto col-xl-auto">
            
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <div class="card-group mb-3 shadow-3-strong border-dark">
              <div class="card">
                <h1 class="mb-3 text-center mt-4" style="color: dodgerblue">Active Users List</h1>
                <div class="card-body position-relative" style="height: 510px; overflow-y: scroll;">
                  <ul class="user-list mb-3">
                    <li class="user p-2 border-bottom" style="margin-left: -25px;" *ngFor="let user of userList" [ngClass]="{'active': user === activeUser}">
                      <div class="d-flex flex-row">
                        <div class="user-indicator align-self-center far fa-circle fa-3x"></div>
                        <div id="usericon" class="fas fa-user text-dark text-opacity-50 align-self-center fa-2x"></div>
                        <div class="pt-1">
                          <p class="fw-bold text-break text-capitalize mb-0" style="color: grey;">{{ user }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
            <div class="card shadow-3-strong border-dark">
              <h1 class="text-center mt-4" style="color: grey;">Group Chat</h1>
              <div class="card-body" style="position: relative; height: 420px; overflow-y: scroll;" #chatMessages>
                <div class="message" *ngFor="let msg of messageListService.getMessages()" [ngClass]="{'mine': msg.mine}">
                  <i *ngIf="msg.userName != activeUser" class="fas fa-user fa-2x rounded-circle d-flex align-self-start me-3" [style.color]="msg.color"></i>
                  <div class="message-box d-flex justify-content-between text-break">
                    
                    <div *ngIf="msg.userName == activeUser" class="card bg-secondary bg-opacity-10 shadow-3-strong border-dark small mb-3" 
                         style="min-width: 100px; max-width: 500px; min-height: 70px;">
                      <div class="card-title d-flex justify-content-start p-3">
                        <p class="name text-break text-capitalize" style="font-size: medium;" [style.color]="msg.color">{{ msg.userName }}</p>
                      </div>
                      <div class="card-body d-flex justify-content-start small p-3">
                        <p class="content mb-0" style="font-size: small; margin-top: -15px;">{{ msg.message }}</p>
                      </div>
                    </div>

                    <div *ngIf="msg.userName != activeUser" class="card bg-info bg-opacity-10 shadow-3-strong border-dark small mb-3" 
                         style="min-width: 100px; max-width: 500px; min-height: 70px;">
                      <div class="card-title d-flex justify-content-start p-3">
                        <p class="name text-break text-capitalize" style="font-size: medium" [style.color]="msg.color">{{ msg.userName }}</p>
                      </div>
                      <div class="card-body d-flex justify-content-start small p-3">
                        <p class="content mb-0" style="font-size: small; margin-top: -15px;">{{ msg.message }}</p>
                      </div>
                    </div>
                    
                  </div>
                  <i *ngIf="msg.userName == activeUser" class="fas fa-user fa-2x rounded-circle d-flex align-self-start ms-3" [style.color]="msg.color"></i>
                </div>
              </div>
              
              <div class="card-footer shadow-3-strong border-dark">
                <div class="send-message text-muted d-flex justify-content-start align-items-center py-sm-0">
                  <textarea matInput type="text" class="form-control float-start form-control-md" style="resize: none;" 
                            (keyup.enter)="sendMessage()" [(ngModel)]="message" placeholder="Type a message"></textarea>
                  <button class="btn btn-info btn-rounded float-end small" type="button" (click)="sendMessage()">
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

  messageListService: MessageListService;

  userName = "";
  message = "";
  userList: string[] = [];
  socket: any;
  activeUser: string = "";

  constructor(private activatedRoute: ActivatedRoute) {
    this.userNameUpdate(this.activatedRoute.snapshot.paramMap.get('username') !);
    this.messageListService = new MessageListService()
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
        if (this.messageListService
            .getMessages()
            .filter(el => el.userName == data.userName)
            .length == 0) {
          this.messageListService.addMessage({message: data.message, userName: data.userName, mine: false, color: this.getRandomColor()})
        } else {
          const userInfo = this.messageListService
              .getMessages()
              .filter(el => el.userName == data.userName)
          this.messageListService.addMessage({message: data.message, userName: data.userName, mine: false, color: userInfo[0].color})
        }
      }
    });
  }

  sendMessage(): void {
    const regex = /^(\n|''| .*)/;
    if (!regex.test(this.message)) {
      this.socket.emit('message', this.message);
      this.messageListService.addMessage({message: this.message, userName: this.userName, mine: true, color: "#4caf50"})
      this.message = "";
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
  }

  getRandomColor(): string {
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

  protected readonly fadeInItems = fadeInItems;
  protected readonly style = style;
}