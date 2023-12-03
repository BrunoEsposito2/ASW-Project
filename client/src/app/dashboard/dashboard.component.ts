import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as $ from 'jquery';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {AdminService} from "../admin.service";
import { AuthSession } from 'src/utils/AuthSession';


@Component({
  selector: 'app-dashboard',
  template: `
    <!--<div class="toast show bg-light" id="toast-elem" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">

        <strong class="me-auto">Bootstrap</strong>
        <small>11 mins ago</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        Hello, world! This is a toast message.
      </div>
    </div>-->

    <ngb-toast
        (hidden)="isToastVisible = false"
        [ngClass]="isToastVisible ? 'd-block' : 'd-none'"
    >
      <div [ngClass]="'toast show bg-light'">
        <div class="toast-header">
          <strong class="me-auto">Toast Title</strong>
          <small>11 mins ago</small>
          <button type="button" class="btn-close" (click)="isToastVisible = false" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          This is a toast message!
        </div>
      </div>
    </ngb-toast>
    
    <section id="main">
      <div class="row">
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Productivity component</div>
            <div class="card-body">
              <app-charts-component></app-charts-component>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card bg-light">
              <div class="card-header custom-font">Mixer unit component</div>
              <div class="card-body">
                <app-mixer-unit-component class="d-flex justify-content-center"></app-mixer-unit-component>
              </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Assistants component</div>
            <div class="card-body less-padding">
              <app-assistants-component></app-assistants-component>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Power unit component</div>
            <div class="card-body">
              <app-power-unit-component></app-power-unit-component>
              <app-power-unit-charts-component></app-power-unit-charts-component>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Ingredients component </div>
            <div class="card-body">
              <app-ingredients-component></app-ingredients-component>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card bg-light">
            <div class="card-header custom-font">Steps component</div>
            <div class="card-body">
              <app-steps-component></app-steps-component>
            </div>
          </div>          
        </div>
      </div>
    </section>
    <!--<button (click)="showToast()" class="btn btn-primary">Mostra Toast</button>-->
  `,
  styles: [`
      #main {
        margin-top:30px;
    }
  `]
})

export class DashboardComponent implements OnInit {
  private authSession: AuthSession;
  private isAuthenticated = false;
  private token: string = "";
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  isToastVisible = false;

  constructor(
      private router: Router
  ) {
    this.authSession = new AuthSession()
  }

  showToast() {
    this.isToastVisible = true;
  }

  ngOnInit(): void {
    const authInformation = this.authSession.getAuthData();
    console.log("auth infos " + authInformation)
    if (!authInformation) {
      this.logout();
      alert("Session Expired or Login Necessary. Please, insert your credentials to start working")
      return
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log("Expire time " + expiresIn)
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.authSession.clearAuthData();
    this.router.navigate(["/"]);
  }
}
