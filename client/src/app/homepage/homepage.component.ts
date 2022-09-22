import { Component, OnInit } from '@angular/core';

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
          <app-productivity-component></app-productivity-component>
        </div>
        <div class="col-4">
          <h2> Mixer unit component </h2>
          <app-mixer-unit-component></app-mixer-unit-component>
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
  `,
  styles: [
  ]
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
