import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthSession} from "../../../utils/auth-session";
import {SocketChatService} from "../../../utils/socket-chat.service";

@Component({
  selector: 'app-employee-navbar',
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a 
            class="navbar-brand me-2"
            [routerLink]="['/employees/dashboard/', activatedRoute.snapshot.paramMap.get('username')]"
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
            <a class="nav-link active" (click)="redirectToChat()"> Chat </a>
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
  styleUrls: ['./employee-navbar.component.style.scss']
})
export class EmployeeNavbarComponent {
  private authSession: AuthSession;

  constructor(
      public activatedRoute: ActivatedRoute,
      private router: Router,
      private socketService: SocketChatService
  ) {
    this.authSession = new AuthSession()
    this.socketService.openConnections(this.activatedRoute.snapshot.paramMap.get('username')!)
  }

  redirectToHomePage() {
    this.socketService.disconnect()
    this.authSession.clearAuthData();
    this.router.navigate(['/']);
  }

  redirectToDashboard() {
    this.router.navigate(['employees/dashboard/' + this.activatedRoute.snapshot.paramMap.get('username')]);
  }

  redirectToChat(): void {
    this.router.navigate(["employees/chat/" + this.activatedRoute.snapshot.paramMap.get('username') !]);
  }
}
