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