import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  template: `
    <app-homepage-navbar></app-homepage-navbar>
    <div class="px-4 py-5 my-5 text-center">
<!--      <img class="d-block mx-auto mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57">-->
      <h1 class="display-5 fw-bold">Welcome to FraBruGia S.r.l.</h1>
      <div class="col-lg-6 mx-auto">
        <div class="col-4 custom_font">
          <h2 class="custom-font"> Productivity component </h2>
        <p class="lead mb-4">
          Press the button for your role here to log in.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" class="btn btn-outline-primary btn-lg px-4 gap-3" (click)="adminLogin()">Admin</button>
          <button type="button" class="btn btn-outline-primary btn-lg px-4" (click)="employeeLogin()">Employee</button>
          <h2 class="text-center custom-font"> Mixer unit component </h2>
          <h2 class="custom-font"> Assistants component </h2>
          <h2 class="custom-font"> Power unit component </h2>
          <h2 class="custom-font"> Ingredients component </h2>
        </div>
          <h2 class="custom-font"> Steps component </h2>
      </div>
    </div>
  `,
  styles:
    [`
    #logoFrabrugia {
      height: 40%;
      width: 30%;
    }

    @font-face {
      font-family: 'custom_font_gemu';
      src: url('../../assets/Gemunu_Libre/static/GemunuLibre-Regular.ttf') format('truetype');
    }
    
    .custom-font {
      font-family: 'custom_font_gemu', sans-serif;
    }
  `]

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