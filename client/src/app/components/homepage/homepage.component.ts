import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  template: `
    <app-homepage-navbar></app-homepage-navbar>
      <div class="video-container">
        <div class="buttons">
          <div class="button-container">
            <div class="row">
              <div class="card bg-light text-center">
                <div class="card-header">LOGIN</div>
                  <div class="card-body">
                    <div class="col" role="group" aria-label="First group">
                      <button type="button" id="adminButton" class="btn me-2 btn-primary btn-lg custom-font mb-2" (click)="adminLogin()">Admin</button>
                      <button type="button" id="opButton" class="btn btn-primary btn-lg custom-font mb-2" (click)="employeeLogin()">Employee</button>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
        <video data-test="video-content" preload="auto" src="https://cdn.dribbble.com/userupload/8705023/file/large-cec325409ba99f93a7df8a6931e3e1c0.mp4" playsinline="true" loop="loop" draggable="false" autoplay="autoplay"></video>
      </div>
    <app-footer></app-footer>
  `,
  styles:
    [`
    .video-container {
      position: relative;
      height: 90vh;
      overflow: hidden;
    }

    .video-container video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(5px); /* Aggiungi uno sfondo sfuocato */
    }
    
    .button-container {
      position: absolute;
      top: 50%;
      left: 50%;
      width:50%;
      transform: translate(-50%, -50%);
      text-align: center;
      background: transparent;
      z-index: 1; 
    }
    
    @font-face {
      font-family: 'custom_font_gemu';
      src: url('../../../assets/Gemunu_Libre/static/GemunuLibre-Regular.ttf') format('truetype');
    }
  `]

})

export class HomepageComponent {
  constructor (private router: Router) {  }

  adminLogin() {
    this.router.navigate(['admins/login']);
  }

  employeeLogin() {
    this.router.navigate(['employees/login']);
  }
}