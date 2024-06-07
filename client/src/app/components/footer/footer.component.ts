import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer" [ngClass]="getBodyClass()">
      <!-- Copyright -->
      FraBruGia © 2024 Copyright
      <!-- Copyright -->
    </footer>
  `,
  styleUrls: ['./footer.component.style.scss']
})
export class FooterComponent {
  @Input() collapsed = false
  @Input() screenWidth = 0

  getBodyClass() {
    let styleClass = ''
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass
  }
}
