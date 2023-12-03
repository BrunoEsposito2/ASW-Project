import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthSession} from "../../utils/auth-session";

@Component({
  selector: 'app-employee-navbar',
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <!-- Container wrapper -->
      <div class="container">
        <!-- Navbar brand -->
        <a class="navbar-brand me-2">
          FraBruGia S.r.l.
        </a>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarButtonsExample">
          <!-- Left links -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <button class="nav-link" (click)="redirectToDashboard()">Dashboard</button>
            </li>
            <li class="nav-item">
              <button class="nav-link" (click)="redirectToChat()"> Chat </button>
            </li>
          </ul>
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
  styles: [
  ]
})
export class EmployeeNavbarComponent {
  private authSession: AuthSession;

  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {
    this.authSession = new AuthSession()
  }

  redirectToHomePage() {
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
