import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { FakerEmployeeDataService } from '../../faker-employee-data';
import {FakerCycleProduction} from "../../faker-cycle-production";
import {FakerProductionService} from "../../services/faker-production-service/faker.production.service";
import {AuthSession} from "../../../utils/auth-session";
import {SocketChatService} from "../../../utils/socket-chat.service";

@Component({
  selector: 'app-admin-navbar',
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a 
            class="navbar-brand me-2" 
            [routerLink]="['/admins/dashboard/', activatedRoute.snapshot.paramMap.get('username')]"
        >
          <img class="" src="../assets/tower-logo.png" alt="logo_frabrugia" style="width:100px; height:40px" >
        </a>

        <!-- Toggle button -->
        <button
            class="navbar-toggler"
            type="button"
            (click)="noListNav.toggle()"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div 
            class="collapse navbar-collapse" 
            id="navbarButtonsExample"
            mdbCollapse
            #noListNav="mdbCollapse"
        >
          <!-- Left links -->
          <div class="navbar-nav me-auto mb-2 mb-lg-0">
            <a class="nav-link active" (click)="redirectToDashboard()">Dashboard</a>
            <a class="nav-link active" (click)="redirectToEmployees()">Employees</a>
            <a class="nav-link active" (click)="redirectToChat()">Chat</a>
          </div>
          
          <!-- Left links -->
          
          <div class="d-flex align-items-center">
            <button type="button" class="btn btn-primary me-3" (click)="redirectToHomePage()">
              Log Out
            </button>
          </div>
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
  `,
  styleUrls: ['./admin-navbar.component.style.scss']
})
export class AdminNavbarComponent {
  private authSession: AuthSession;
  public isFakerServiceActive = false

  constructor(
      public activatedRoute: ActivatedRoute,
      private router: Router,
      protected socketService: SocketChatService,
      private fakerEmployeeDataService: FakerEmployeeDataService,
      private fakerCycleProduction : FakerCycleProduction,
      private fakerProduction : FakerProductionService,
  ) {
    this.authSession = new AuthSession()
    this.socketService.openConnections(this.activatedRoute.snapshot.paramMap.get('username')!)
    this.toggleFakerService()
  }

  redirectToHomePage() {
    this.socketService.disconnect()
    this.authSession.clearAuthData();
    this.router.navigate(['/']);
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
      this.fakerCycleProduction.stopUpdating();
      this.fakerEmployeeDataService.stopUpdatingDatabase();
      this.fakerProduction.stopUpdating();
      this.isFakerServiceActive = false;
    } else {
      this.fakerCycleProduction.startUpdating();
      this.fakerEmployeeDataService.startUpdatingDatabase();
      this.fakerProduction.startUpdating();
      this.isFakerServiceActive = true;
    }
  }
}
