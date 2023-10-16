import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  template: `
    <app-admin-navbar></app-admin-navbar>
    <div>
      <app-dashboard></app-dashboard>
    </div>
  `,
  styles: [
  ]
})
export class AdminComponent {
}
