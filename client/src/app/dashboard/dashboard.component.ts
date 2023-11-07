import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';


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
            <div class="card-body">
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

export class DashboardComponent {
  isToastVisible = false;
  showToast() {
    this.isToastVisible = true;
  }

}
