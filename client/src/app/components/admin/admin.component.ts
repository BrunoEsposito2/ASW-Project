import {Component} from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
    <app-admin-side-nav></app-admin-side-nav>
    <div>
      <app-dashboard></app-dashboard>
      <app-floating-chat></app-floating-chat>
      <app-footer></app-footer>
    </div>
  `,
  styles: [
  ]
})

export class AdminComponent { }
