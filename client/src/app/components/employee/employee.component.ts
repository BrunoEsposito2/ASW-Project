import {Component, Input} from '@angular/core';

interface SideNavToggle {
  screenWidth: number
  collapsed: boolean
}

@Component({
  selector: 'app-employee',
  template: `
    <app-employee-side-nav (onToggleSidenav)="onToggleSidenav($event)"></app-employee-side-nav>
    <div>
      <app-dashboard
          [collapsed]="collapsed"
          [screenWidth]="screenWidth"
      ></app-dashboard>
      <app-floating-chat></app-floating-chat>
      <app-footer
          [collapsed]="collapsed"
          [screenWidth]="screenWidth"
      ></app-footer>
    </div>
  `,
  styles: [
  ]
})
export class EmployeeComponent {
  @Input() collapsed = false
  @Input() screenWidth = 0

  onToggleSidenav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth
    this.collapsed = data.collapsed
  }
}
