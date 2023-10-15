import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-homepage',
  template: `
    <h1 class="text-center">
      <img id="logoFrabrugia" src="../../assets/tower-logo.png" />
    </h1>
    <section id="main">
      <div class="row">
        <div class="col-4 custom_font">
          <h2 class="custom-font"> Productivity component </h2>
          <app-charts-component></app-charts-component>
        </div>
        <div class="col-4">
          <h2 class="text-center custom-font"> Mixer unit component </h2>
          <app-mixer-unit-component class="d-flex justify-content-center"></app-mixer-unit-component>
        </div>
        <div class="col-4">
          <h2 class="custom-font"> Assistants component </h2>
          <app-assistants-component></app-assistants-component>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <h2 class="custom-font"> Power unit component </h2>
          <app-power-unit-component></app-power-unit-component>
          <app-power-unit-charts-component></app-power-unit-charts-component>
        </div>
        <div class="col-4">
          <h2 class="custom-font"> Ingredients component </h2>
          <app-ingredients-component></app-ingredients-component>
        </div>
        <div class="col-4">
          <h2 class="custom-font"> Steps component </h2>
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
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
