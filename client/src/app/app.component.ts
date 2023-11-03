import {Component} from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Toast} from "bootstrap";
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-md">
    <router-outlet></router-outlet>
  </div>
  `
})
export class AppComponent {

  ngOnInit() {

    Array.from(document.querySelectorAll('.toast'))
        .forEach(toastNode => new Toast(toastNode))

  }

}
