import { Component } from '@angular/core';
import { FakerEmployeeDataService } from '../faker-employee-data';

@Component({
  selector: 'app-dashboard',
  template: `
    <h1>Dashboard</h1>
    <button (click)="toggleService()">{{ service.isActive() ? 'Disattiva' : 'Attiva' }} Aggiornamento Database</button>
    <div [ngClass]="{'led-on': service.isActive(), 'led-off': !service.isActive()}"></div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(public service: FakerEmployeeDataService) {}

  toggleService() {
    if (this.service.isActive()) {
      this.service.stopUpdatingDatabase();
    } else {
      this.service.startUpdatingDatabase();
    }
  }
}
