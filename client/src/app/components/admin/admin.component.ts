import {Component} from '@angular/core';

interface SideNavToggle {
  screenWidth: number
  collapsed: boolean
}

@Component({
  selector: 'app-admin',
  template: `
    <app-admin-side-nav (onToggleSidenav)="onToggleSidenav($event)"></app-admin-side-nav>
    <div>
      <app-dashboard
          [collapsed]="isSideNavCollapsed"
          [screenWidth]="screenWidth"
      ></app-dashboard>
      <app-floating-chat
          [collapsed]="isSideNavCollapsed"
          [screenWidth]="screenWidth"
      ></app-floating-chat>
      <app-footer
          [collapsed]="isSideNavCollapsed"
          [screenWidth]="screenWidth"
      ></app-footer>
    </div>
  `,
  styles: [
  ]
})

export class AdminComponent {
  isSideNavCollapsed = false
  screenWidth = 0

  onToggleSidenav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth
    this.isSideNavCollapsed = data.collapsed
  }
}
