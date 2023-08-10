import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-chat-button',
  template: `
    <p>
          <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#app-chat"
              aria-expanded="false"
              aria-controls="app-chat"
              (click)="setUserName()"
          >
            Chat
          </button>
    </p>
  `,
  styleUrls: ['../chat/chat.component.scss']
})
export class ChatButtonComponent {
  @Output() userNameEvent = new EventEmitter<string>();

  constructor(private route: ActivatedRoute) {  }

  setUserName(): void {
    this.userNameEvent.emit(this.route.snapshot.paramMap.get('username') !);
  }

}
