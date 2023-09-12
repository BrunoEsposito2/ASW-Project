import { Component, OnInit } from '@angular/core';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-homepage',
  template: `
    <h1 class="text-center">
      FraBruGia S.r.l.
    </h1>
    <section id="main">
      <div class="row">
        <div class="col-4">
          <h2> Productivity component </h2>
          <app-charts-component></app-charts-component>
        </div>
        <div class="col-4">
          <h2> Mixer unit component </h2>
        </div>
        <div class="col-4">
          <h2> Assistants component </h2>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h2> Power unit component </h2>
          <app-power-unit-charts-component></app-power-unit-charts-component>
        </div>
        <div class="col-4">
          <h2> Ingredients component </h2>
        </div>
        <div class="col-4">
          <h2> Steps component </h2>
        </div>
      </div>
    </section>
    <button (click)="showNotification()">Show Notification</button>
    <notifier-container>
      
    </notifier-container>
    
  `,
  styles: [
  ]
})
export class HomepageComponent implements OnInit {

  private notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  public showNotification(): void {
    this.notifier.notify('success', 'This is a test notification!');
  }
  ngOnInit(): void {
  }
}


