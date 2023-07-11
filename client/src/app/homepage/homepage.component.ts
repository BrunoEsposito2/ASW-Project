import {Component, OnInit} from '@angular/core';

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
          <h2 class="text-center"> Mixer unit component </h2>
          <app-mixer-unit-component class="d-flex justify-content-center"></app-mixer-unit-component>
        </div>
        <div class="col-4">
          <h2> Assistants component </h2>
          <app-assistants-component></app-assistants-component>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h2> Power unit component </h2>
          <app-power-unit-component></app-power-unit-component>
          <app-power-unit-charts-component></app-power-unit-charts-component>
        </div>
        <div class="col-4">
          <h2> Ingredients component </h2>
          <app-ingredients-component></app-ingredients-component>
        </div>
        <div class="col-4">
          <h2> Steps component </h2>
          <app-steps-component></app-steps-component>
        </div>
      </div>
    </section>
    <section id="chat">
      <app-chat></app-chat>
    </section>
    <!--<section id="login">
      <app-login></app-login>
    </section>-->
  `,
  styles: [
  ]
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
