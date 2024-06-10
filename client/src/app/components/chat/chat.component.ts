import {
  AfterViewChecked,
  Component,
  ElementRef, HostListener, Input, OnInit,
  ViewChild
} from '@angular/core';
import {SocketChatService} from "../../services/socket-chat.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: [ './chat.component.scss' ]
})

export class ChatComponent implements AfterViewChecked, OnInit {
  @Input() collapsed = false
  @Input() screenWidth = 0

  @ViewChild('chatMessages') chatMessages!: ElementRef;

  constructor(protected socketService: SocketChatService) {
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

  getBodyClass() {
    let styleClass = ''
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass
  }
}