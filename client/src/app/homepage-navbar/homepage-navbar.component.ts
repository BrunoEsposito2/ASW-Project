import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage-navbar',
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light custom-nav bg-light">
      <!-- Container wrapper -->
      <div class="container custom-nav">
        <!-- Navbar brand -->
        <a class="navbar-brand me-2">
          <img class="" src="../assets/tower-logo.png" alt="logo_frabrugia" style="width:100px; height:40px" >
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
        <div class="collapse navbar-collapse custom-nav" id="navbarButtonsExample">
          <!-- Left links -->
          <ul class="navbar-nav custom-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link custom-font" href="/">Home</a>
            </li>
          </ul>
          <!-- Left links -->
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
export class HomepageNavbarComponent {

}
