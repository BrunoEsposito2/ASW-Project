import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-assistants-component',
  template: `
    <div class="row">
      <div class="col-md-6">
        <div class="card bg-light">
          <img src="https://thumbs.dreamstime.com/b/passport-picture-cool-guy-blue-shirt-isolated-white-background-cut-out-55127029.jpg" style="width:100px; height:130px" class="card-img-top mx-auto d-block" alt="Foto Operatore 1">
          <div class="card-body">
            <h5 class="card-title custom-font">Operatore 1</h5>
            <p class="card-text">Informazioni sull'Operatore 1</p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card bg-light">
          <img src="https://thumbs.dreamstime.com/b/jeune-homme-amical-36669104.jpg" style="width:100px; height:130px" class="card-img-top mx-auto d-block" alt="Foto Operatore 2">
          <div class="card-body">
            <h5 class="card-title custom-font">Operatore 2</h5>
            <p class="card-text">Informazioni sull'Operatore 2</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class AssistantsComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
