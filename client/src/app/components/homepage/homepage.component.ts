import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  template: `
    <div class="video-container">
      <div class="buttons">
        <div class="button-container">
          <div class="row">
            <mat-card class="matcard">
              <mat-card-header class="loginHeader">
                <mat-card-title class="title">
                  <img class="" src="../../../assets/tower-logo-nogb.png" alt="logo_frabrugia" style="width:80%; height:80%">
                </mat-card-title>
              </mat-card-header>
              <mat-card-actions class="cardActions">
                <button id="adminButton" (click)="adminLogin()" mat-raised-button>
                  ADMIN
                </button>
                <br>
                <button id="employeeButton" (click)="employeeLogin()" mat-raised-button>
                  EMPLOYEE
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
      </div>
      <img src="../../../assets/large-thumbnail20230719-900-1op9mb0.gif" alt="Animated background"
           class="background-gif">
    </div>
    <app-footer></app-footer>
  `,
  styles:
    [`
    .matcard {
      background: rgba(255, 255, 255, 0.65);
      /*border: 1px solid rgba(255, 255, 255, 0.2);*/
    }
      
    .video-container {
      position: relative;
      height: 90vh;
      overflow: hidden;
    }

    .background-gif {
      position: fixed;
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
    
    #adminButton, #employeeButton {
      color: white;
      background-color: #3b71ca;
      margin: 8px;
    }
    
    .cardActions {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .loginHeader {
      align-self: center;
      color: #113c60;
    }

    .title {
      text-align: center;
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