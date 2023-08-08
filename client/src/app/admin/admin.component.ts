import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container">
        <!-- Navbar brand -->
        <a class="navbar-brand me-2">
          FraBruGia S.r.l.
        </a>

        <!-- Toggle button -->
        <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
          <i class="fas fa-bars"></i>
        </button>

        <!-- Collapsible wrapper -->
        <div class="collapse navbar-collapse" id="navbarButtonsExample">
          <!-- Left links -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="admins/dashboard">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="employees">Employees</a>
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
    <app-dashboard></app-dashboard>
  `,
  styles: [
  ]
})
export class AdminComponent {

  constructor (private router: Router) { }

  redirectToHomePage() {
    this.router.navigate(['admins/login']);
  }
}
