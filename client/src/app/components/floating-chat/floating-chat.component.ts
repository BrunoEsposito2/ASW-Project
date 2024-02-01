import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SocketChatService} from "../../../utils/socket-chat.service";

@Component({
  selector: 'app-floating-chat',
  template: `
    <div *ngIf="isActive">
      <section class="position-fixed bottom-0 end-0" style="padding-bottom: 20px">
        <button 
            type="button" (click)="this.isActive = false" 
            style="position: absolute; top: 0; right: 0; z-index: 9999; margin-right: 36px; margin-top: 38px; border-radius: 50%; width: 25px; height: 25px" 
            class="btn btn-outline-primary bg-primary text-light p-0" 
        >
          <i class="fas fa-times"></i>
        </button>
        <div class="container px-5 py-5">
          <div class="row d-flex justify-content-center">
            <div class="col-12">
              
              <div class="card shadow-3-strong border-dark">
                <mdb-tabs>
                  <mdb-tab [title]="getTitle()">

                    <div *ngIf="socketService.receiver == ''; else elseBlock" class="card-body"  style="position: relative; height: 300px; overflow-y: scroll;" #chatMessages>
                      
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
                      <div class="card-body"  style="position: relative; height: 300px; overflow-y: scroll;" #chatMessages>

                        <div class="message" *ngFor="let msg of socketService.messageRooms.get(socketService.getRoomId())" [ngClass]="{'mine': msg.userName == socketService.activeUser}">
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
                      <li class="user gap-1 p-2 border-bottom row" style="margin-left: -25px;" *ngFor="let user of socketService.filteredUserList()" [ngClass]="{'active': user === socketService.activeUser}">
                        <a 
                            class="btn btn-light col-sm-8"
                            type="button"
                        >
                          <div class="d-flex flex-row">
                            <div class="user-indicator align-self-center far fa-circle fa-3x"></div>
                            <div id="usericon" class="fas fa-user text-dark text-opacity-50 align-self-center fa-2x"></div>
                            <p class="fw-bold text-break text-capitalize mb-0" style="max-width: 200px; color: grey;">
                              {{ user }}
                            </p>
                          </div>
                        </a>
                        <button type="button"
                                class="btn btn-md btn-primary col-sm-2"
                                style="margin-left:20px;"
                                (click)="socketService.sendHistoryRequest(user)"
                                title="Invia Notifiche"
                                mdbRipple>
                          <i class="fas fa-message"></i>
                        </button>
                        <div class="row g-3">
                          <button class="col-2 btn btn-sm btn-warning"
                                  title="Cambia ricetta"
                                  (click)="sendSingleMessage(user, 'Cambia ricetta')"
                                  mdbRipple>
                            <i class="fas fa-exchange"></i>
                          </button>
                          <div class="col-1"></div>
                          <button class="col-2 btn btn-sm btn-info"
                                  title="Vieni in cabina"
                                  (click)="sendSingleMessage(user, 'Vieni in cabina')"
                                  mdbRipple>
                            <i class="fas fa-chalkboard-teacher"></i>
                          </button>
                          <div class="col-1"></div>
                          <button class="col-2 btn btn-sm btn-success"
                                  title="Vai in pausa"
                                  (click)="sendSingleMessage(user, 'Vai in pausa')"
                                  mdbRipple>
                            <i class="fas fa-pause"></i>
                          </button>
                          <div class="col-1"></div>
                          <button class="col-2 btn btn-sm btn-danger"
                                  title="Fine del turno"
                                  (click)="sendSingleMessage(user, 'Fine del turno')"
                                  mdbRipple>
                            <i class="fas fa-house"></i>
                          </button>
                          <div class="col-1"></div>
                        </div>
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
              style="margin-right: 15px; margin-bottom: 100px;"
              (click)='socketService.sendMessageWarningOrAlert("Allarme generico")'
              title="Allarme generico"
              mdbRipple>
        <i class="fa fa-warning"></i>
      </button>
      <button type="button"
              class="btn btn-floating btn-secondary btn-lg"
              style="margin-right: 15px; margin-bottom: 100px;"
              (click)='socketService.sendMessageWarningOrAlert("Allarme Antincendio")'
              title="Allarme Antincendio"
              mdbRipple>
        <i class="fa fa-fire"></i>
      </button>
      
      <button type="button"
              class="btn btn-floating btn-secondary btn-lg" 
              style="margin-bottom: 40px; margin-right:80px;"
              (click)="toggleChat()"
              title="Invia un messaggio"
              mdbRipple>
        <i class="fas fa-plus"></i>
      </button>
    </div>
      
    <div>
      <button type="button" 
              class="btn btn-lg btn-primary btn-floating position-fixed bottom-0 end-0"
              [ngClass]="{ 'active': isActive }"
              style="margin-right: 20px; margin-bottom: 40px;"
              title="Invia messaggi"
              (click)="this.isActive = !this.isActive"
              mdbRipple>
        <i class="fas fa-message"></i>
      </button>
      <button type="button"
              class="btn btn-floating btn-secondary btn-lg btn-floating position-fixed bottom-0 end-0"
              style="margin-right: 15px; margin-bottom: 100px;"
              (click)='socketService.sendMessageWarningOrAlert("Allarme generico")'
              title="Allarme generico"
              mdbRipple>
        <i class="fa fa-warning"></i>
      </button>
      <button type="button"
              class="btn btn-floating btn-secondary btn-lg btn-floating position-fixed bottom-0 end-0"
              style="margin-right: 15px; margin-bottom: 150px;"
              (click)='socketService.sendMessageWarningOrAlert("Allarme Antincendio")'
              title="Allarme Antincendio"
              mdbRipple>
        <i class="fa fa-fire"></i>
      </button>
    </div>
  `,
  styleUrls: ['../chat/chat.component.scss']
})
export class FloatingChatComponent implements AfterViewChecked {
  @ViewChild('chatMessages') chatMessages!: ElementRef;

  isActive: boolean
  buttonsOn: boolean

  constructor(protected socketService: SocketChatService) {
    this.isActive = false
    this.buttonsOn = false
  }

  ngAfterViewChecked(): void {
    if (this.chatMessages != null) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
  }

  getTitle(): string {
    return this.socketService.receiver == '' ? "Broadcast Chat" : this.socketService.receiver;
  }

  sendSingleMessage(user: string, message: string): void {
    this.socketService.sendHistoryRequest(user);
    this.socketService.message = message;
    this.socketService.sendRoomMessage();
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
}
