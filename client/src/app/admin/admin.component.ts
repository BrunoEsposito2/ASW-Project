import {Component} from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <app-admin-navbar></app-admin-navbar>
    <div>
      <app-dashboard></app-dashboard>
      <app-floating-chat></app-floating-chat>
    </div>
  `,
  styles: [
  ]
})

export class AdminComponent { }
