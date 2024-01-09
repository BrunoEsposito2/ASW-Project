import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage-navbar',
  template: `
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- Container wrapper -->
      <div class="container-fluid">
        <!-- Navbar brand -->
        <a class="navbar-brand me-2" href="/">
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
            id="navbarNavAltMarkup"
            mdbCollapse
            #noListNav="mdbCollapse"
        >
          <!-- Left links -->
          <div class="navbar-nav">
            <a class="nav-link active" href="/">Home</a>
          </div>
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
