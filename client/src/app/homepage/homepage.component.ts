import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
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
              <a class="nav-link" href="/">Home</a>
            </li>
          </ul>
          <!-- Left links -->
        </div>
        <!-- Collapsible wrapper -->
      </div>
      <!-- Container wrapper -->
    </nav>
    <!-- Navbar -->
    <div class="px-4 py-5 my-5 text-center">
<!--      <img class="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">-->
      <h1 class="display-5 fw-bold">Welcome to FraBruGia S.r.l.</h1>
      <div class="col-lg-6 mx-auto">
        <p class="lead mb-4">
          Press the button for your role here to log in.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" class="btn btn-outline-primary btn-lg px-4 gap-3" (click)="adminLogin()">Admin</button>
          <button type="button" class="btn btn-outline-primary btn-lg px-4" (click)="employeeLogin()">Employee</button>
        </div>
      </div>
    </div>
  `,
  styles: [

  ]
})

export class HomepageComponent {
  constructor (private router: Router) { }

  adminLogin() {
    this.router.navigate(['admins/login']);
  }

  employeeLogin() {
    this.router.navigate(['employees/login']);
  }
}