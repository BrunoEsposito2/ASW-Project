import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FakerEmployeeDataService } from '../faker-employee-data';

@Component({
  selector: 'app-admin-navbar',
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light custom-nav sticky-top">
      <!-- Container wrapper -->
      <div class="container custom-nav">
        <!-- Navbar brand -->
        <a class="navbar-brand me-2">
          <img class="" src="../assets/tower-logo.png" alt="logo_frabrugia" style="width:100px; height:40px" >
        </a>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse custom-nav" id="navbarButtonsExample">
          <!-- Left links -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item custom-font">
              <button class="nav-link custom-font" (click)="redirectToDashboard()">Dashboard</button>
            </li>
            <li class="nav-item">
              <button class="nav-link custom-font" (click)="redirectToEmployees()">Employees</button>
            </li>
            <li class="nav-item">
              <button class="nav-link custom-font" (click)="redirectToChat()"> Chat </button>
            </li>
            <li class="nav-item">
              <button class="nav-link custom-font" (click)="redirectToProductions()"> Productions </button>
            </li>
          </ul>
          <!-- Left links -->

          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-primary me-3 custom-font" (click)="redirectToHomePage()">
              Log Out
            </button>
            <button (click)="toggleFakerService()">On/Off</button>
            <img
                id="faker-state"
                [src]="isFakerServiceActive ? 'assets/icons8-on-80.png' : 'assets/icons8-off-80.png'"
                alt="faker-state"
                style="width: 30px; height: 30px; margin-left:10px"
            >
          </div>
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  `,
  styles: [
  ]
})
export class AdminNavbarComponent {
  public isFakerServiceActive = false
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private fakerEmployeeDataService: FakerEmployeeDataService,
  ) {  }

  redirectToHomePage() {
    this.router.navigate(['admins/login']);
  }

  redirectToDashboard() {
    this.router.navigate(['admins/dashboard/' + this.activatedRoute.snapshot.paramMap.get('username')]);
  }

  redirectToChat(): void {
    this.router.navigate(["admins/chat/" + this.activatedRoute.snapshot.paramMap.get('username') !]);
  }

  redirectToEmployees(): void {
    this.router.navigate(["admins/" + this.activatedRoute.snapshot.paramMap.get('username')! + "/employees"]);
  }

  redirectToProductions(): void {
    this.router.navigate(["admins/" + this.activatedRoute.snapshot.paramMap.get('username')! + "/productions"]);
  }

  toggleFakerService() {
    if (this.fakerEmployeeDataService.isActive()) {
      this.fakerEmployeeDataService.stopUpdatingDatabase();
      this.isFakerServiceActive = false;
    } else {
      this.fakerEmployeeDataService.startUpdatingDatabase();
      this.isFakerServiceActive = true;
    }
  }
}
