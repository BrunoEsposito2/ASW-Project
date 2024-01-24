import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SocketChatService} from "../../utils/socket-chat.service";

@Component({
  selector: 'app-floating-chat',
  template: `
    <div *ngIf="isActive">
      <section class="position-fixed bottom-0 end-0">
        <div class="container px-5 py-5">
          <div class="row d-flex justify-content-center">
            <div class="col-md-16 col-lg-14 col-xl-12">
              
              <div class="card shadow-3-strong border-dark">
                <mdb-tabs>
                  <mdb-tab [title]="getTitle()">

                    <div *ngIf="socketService.receiver == ''; else elseBlock" class="card-body"  style="position: relative; height: 420px; overflow-y: scroll;" #chatMessages>

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
                    
                    <ng-template #elseBlock>
                      <div class="card-body"  style="position: relative; height: 420px; overflow-y: scroll;" #chatMessages>

                        <div class="message" *ngFor="let msg of socketService.messageRoomList" [ngClass]="{'mine': msg.userName == socketService.activeUser}">
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
                    </ng-template>
                    
                    <div class="card-footer shadow-3-strong">
                      <div *ngIf="socketService.receiver == ''; else elseBlock1" class="send-message text-muted d-flex justify-content-start align-items-center py-sm-0">
                        <textarea matInput type="text" class="form-control float-start form-control-sm" style="resize: none;"
                                  (keyup.enter)="socketService.sendMessage()" [(ngModel)]="socketService.message" placeholder="Type a message"></textarea>
                        <button class="btn btn-info btn-rounded float-end btn-sm" style="margin-left: 10px" type="button" (click)="socketService.sendMessage()">
                          <i class="fas fa-paper-plane"></i>
                        </button>
                      </div>
                      <ng-template #elseBlock1>
                        <div class="send-message text-muted d-flex justify-content-start align-items-center py-sm-0">
                        <textarea matInput type="text" class="form-control float-start form-control-sm" style="resize: none;"
                                  (keyup.enter)="socketService.sendRoomMessage()" [(ngModel)]="socketService.message" placeholder="Type a message"></textarea>
                          <button class="btn btn-info btn-rounded float-end btn-sm" style="margin-left: 10px" type="button" (click)="socketService.sendRoomMessage()">
                            <i class="fas fa-paper-plane"></i>
                          </button>
                        </div>
                      </ng-template>
                    </div>
                    
                  </mdb-tab>
                  <mdb-tab title="Active Users List">

                    <ul class="user-list mb-3" style="height: 331.5px; overflow-y: scroll;">
                      <li class="user d-grid gap-1 p-2 border-bottom" style="margin-left: -25px;" *ngFor="let user of socketService.filteredUserList()" [ngClass]="{'active': user === socketService.activeUser}">
                        <a 
                            class="btn btn-light"
                            type="button"
                            (click)="socketService.sendHistoryRequest(user)"
                        >
                          <div class="d-flex flex-row">
                            <div class="user-indicator align-self-center far fa-circle fa-3x"></div>
                            <div id="usericon" class="fas fa-user text-dark text-opacity-50 align-self-center fa-2x"></div>
                            <p class="fw-bold text-break text-capitalize mb-0" style="max-width: 200px; color: grey;">
                              {{ user }}
                            </p>
                          </div>
                        </a>
                        
                      </li>
                    </ul>
                    <div class="d-grid gap-1">
                      <a class="btn btn-light" type="button" (click)="socketService.sendBroadcastHistoryRequest()" data-mdb-ripple-init>
                        Broadcast Chat
                      </a>
                    </div>
                  </mdb-tab>
                </mdb-tabs>
                
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </div>
      
    <div *ngIf="buttonsOn" class="position-fixed bottom-0 end-0">
      <button type="button"
              class="btn btn-floating btn-secondary btn-lg" 
              style="margin-bottom: 40px;"
              (click)="toggleChat()"
              mdbRipple>
        <i class="fas fa-plus"></i>
      </button>
      <button type="button" 
              class="btn btn-floating btn-secondary btn-lg"
              style="margin-right: 25px; margin-bottom: 90px;"
              (click)="redirectToChat()"
              mdbRipple>
        <i class="fa fa-external-link"></i>
      </button>
    </div>
      
    <div>
      <button type="button" 
              class="btn btn-lg btn-primary btn-floating position-fixed bottom-0 end-0"
              [ngClass]="{ 'active': isActive }"
              style="margin-right: 20px; margin-bottom: 40px;"
              (click)="displayButtons()"
              mdbRipple>
        <i class="fas fa-message"></i>
      </button>
    </div>
  `,
  styleUrls: ['../chat/chat.component.scss']
})
export class FloatingChatComponent implements AfterViewChecked {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  isActive: boolean
  buttonsOn: boolean

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      protected socketService: SocketChatService
  ) {
    this.buttonsOn = false
    this.isActive = false
  }

  ngAfterViewChecked(): void {
    if (this.chatMessages != null) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
  }

  toggleChat() {
    this.displayButtons()
    this.isActive = !this.isActive
  }

  displayButtons() {
    if (this.isActive) {
      this.isActive = false
      this.buttonsOn = false
    } else {
      this.buttonsOn = !this.buttonsOn
    }
  }

  redirectToChat(): void {
    this.router.navigate(["admins/chat/" + this.activatedRoute.snapshot.paramMap.get('username') !]);
  }

  getTitle(): string {
    return this.socketService.receiver == '' ? "Broadcast Chat" : this.socketService.receiver;
  }
}
