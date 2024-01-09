import {
  AfterViewChecked,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {SocketChatService} from "../../utils/socket-chat.service";

@Component({
  selector: 'app-chat',
  template: `
    <section id="chat">
      <div class="container shadow-3-strong rounded bg-info bg-opacity-10 mb-2 pb-4 py-4">
        <div class="row col-sm-auto col-md-auto col-lg-auto col-xl-auto col-xxl-auto">
            
          <div class="col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
            <div class="card-group mb-3 shadow-3-strong border-dark">
              <div class="card">
                <h1 class="mb-3 text-center mt-4" style="color: dodgerblue">Active Users List</h1>
                <div class="card-body position-relative" style="height: 510px; overflow-y: scroll;">
                  <ul class="user-list mb-3">
                    <li class="user p-2 border-bottom" style="margin-left: -25px;" *ngFor="let user of socketService.filteredUserList()" [ngClass]="{'active': user === socketService.activeUser}">
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
          
          <div class="col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
            <div class="card shadow-3-strong border-dark" style="margin-top: -15px; margin-bottom: -15px;">
              
              <div class="card-header">
                <h1 class="text-start mt-4" style="float: left; color: grey;">Group Chat</h1>
                <div class="d-flex flex-row pt-4" style="float: right">
                  <div class="align-self-center pe-2">
                    <p class="fw-bold text-break text-capitalize mb-0" style="color: grey;">{{ socketService.activeUser }}</p>
                  </div>
                  <div class="user-indicator align-self-center far fa-circle fa-3x" style="color: #4caf50;"></div>
                  <div id="usericon" class="fas fa-user text-dark text-opacity-50 align-self-center fa-2x"></div>
                </div>
              </div>
              
              <div class="card-body"  style="position: relative; height: 420px; overflow-y: scroll;" #chatMessages>
                
                <div class="message" *ngFor="let msg of socketService.messageList" [ngClass]="{'mine': msg.userName == socketService.activeUser}">
                  <i *ngIf="msg.userName != socketService.activeUser" class="fas fa-user fa-2x rounded-circle d-flex align-self-start me-3" [style.color]="msg.color"></i>
                    <div class="message-box d-flex justify-content-between text-break">

                      <div *ngIf="msg.userName == socketService.activeUser" class="card bg-secondary bg-opacity-10 shadow-3-strong border-dark small mb-3"
                           style="min-width: 30px; max-width: 500px; min-height: 25px; white-space: normal; word-wrap: break-word;">
                        <div class="card-body d-flex justify-content-start small p-3">
                          <p class="content mb-0" style="font-size: small;">{{ msg.message }}</p>
                        </div>
                      </div>

                      <div *ngIf="msg.userName != socketService.activeUser" class="card bg-info bg-opacity-10 shadow-3-strong border-dark small mb-3"
                           style="min-width: 30px; max-width: 500px; min-height: 25px; white-space: normal; word-wrap: break-word;">
                        <div class="card-title d-flex justify-content-start p-3">
                          <p class="name text-break text-capitalize" style="font-size: medium" [style.color]="msg.color">{{ msg.userName }}</p>
                        </div>
                        <div class="card-body d-flex justify-content-start small p-3">
                          <p class="content mb-0" style="font-size: small; margin-top: -25px;">{{ msg.message }}</p>
                        </div>
                      </div>

                    </div>
                  <i *ngIf="msg.userName == socketService.activeUser" class="fas fa-user fa-2x rounded-circle d-flex align-self-start ms-3" style="color: #4caf50"></i>
                </div>
                
              </div>
              
              <div class="card-footer shadow-3-strong">
                <div class="send-message text-muted d-flex justify-content-start align-items-center py-sm-0">
                  <textarea matInput type="text" class="form-control float-start form-control-md" style="resize: none;" 
                            (keyup.enter)="socketService.sendMessage()" [(ngModel)]="socketService.message" placeholder="Type a message"></textarea>
                  <button class="btn btn-info btn-rounded float-end small" type="button" (click)="socketService.sendMessage()">
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

  constructor(protected socketService: SocketChatService) {}

  ngAfterViewChecked(): void {
    if (this.chatMessages != null) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
  }
}