import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  template: `
    <app-employee-side-nav></app-employee-side-nav>
    <app-dashboard></app-dashboard>
    <app-floating-chat></app-floating-chat>
    <app-footer></app-footer>
  `,
  styles: [
  ]
})
export class EmployeeComponent {

}
