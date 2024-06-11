import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Toast} from "bootstrap";
import {ChatMessage} from "../../chat-message";
import {SocketChatService} from "../../services/socket-chat.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-floating-chat',
  templateUrl: './floating-chat.component.html',
  styleUrls: ['./floating-chat.component.scss']
})
export class FloatingChatComponent implements AfterViewChecked, OnInit {
  @ViewChild('chatMessages') chatMessages!: ElementRef;
  @ViewChild('toastNotify') toastNotify!: ElementRef;

  isActive: boolean
  buttonsOn: boolean

  isShown: boolean
  notifyUser: string
  notifyMessage: string

  constructor(protected socketService: SocketChatService) {
    this.isActive = false
    this.buttonsOn = false
    this.isShown = false;
    this.notifyUser = "";
    this.notifyMessage = "";
    this.socketService.socket.on('message-broadcast', (data: {message: string, userName: string, color: string}) => {
      this.isShown = true;
      this.notifyUser = data.userName;
      this.notifyMessage = data.message;
      setTimeout(()=>{
        this.isShown = false;
      }, 9000);

    });
    this.socketService.socket.on('room-message', (room: string, data: ChatMessage[]) => {
      this.isShown = true;
      this.notifyUser = room.split("_")[1];
      this.notifyMessage = data[data.length-1].message!;
      setTimeout(()=>{
        this.isShown = false;
      }, 9000);

    });
  }

  ngOnInit() {
    this.socketService.openConnections(this.socketService.userName)
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
