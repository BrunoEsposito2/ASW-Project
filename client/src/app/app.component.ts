import {Component} from '@angular/core';
import {Toast} from "bootstrap";

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
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
