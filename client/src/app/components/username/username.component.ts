import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-username',
  template: `
    <mat-card>
      <mat-card-content>
        <input matInput type="text" [(ngModel)]="userName">
        <button mat-raised-button color="primary" (click)="setUserName()">Set username</button>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['../chat/chat.component.scss']
})
export class UsernameComponent {
  @Output() userNameEvent = new EventEmitter<string>();

  userName = "";

  constructor() { }

  setUserName(): void {
    this.userNameEvent.emit(this.userName)
  }

}
