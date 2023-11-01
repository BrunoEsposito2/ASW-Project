import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
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
  `,
  styles: [`
      #main {
        margin-top:30px;
    }
  `]
})

export class DashboardComponent {

}
