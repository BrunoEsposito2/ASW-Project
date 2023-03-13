import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-username',
  template: `
    <div>
      <input type="text" [(ngModel)]="userName" )]>
      <button (click)="setUserName()">Set username</button>
    </div>
  `,
  styles: [
  ]
})
export class UsernameComponent {
  @Output() userNameEvent = new EventEmitter<string>();

  userName = "";

  constructor() { }

  setUserName(): void {
    this.userNameEvent.emit(this.userName);
  }

}
