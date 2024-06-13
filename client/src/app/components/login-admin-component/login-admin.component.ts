import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Admin} from "../../admin"

@Component({
  selector: 'app-login-admin-component',
  template: `
    <div class="video-container">
      <div class="buttons">
        <div class="button-container">
          <div class="row">
            <mat-card class="matcard">
              <mat-card-header class="loginHeader">
                <mat-card-title class="title"> Admin Login </mat-card-title>
              </mat-card-header>
              <mat-card-actions class="cardActions">
                <form class="admin-form" autocomplete="off" [formGroup]="adminForm" (ngSubmit)="submitForm()">

                  <div class="email-container">
                    <mat-form-field>
                      <mat-label>Enter your email</mat-label>
                      <input matInput placeholder="email@example.com" formControlName="email" required>
                      <mat-error *ngIf="email.invalid && (email.dirty || email.touched) || email.errors?.['required']"> Email is required. </mat-error>
                    </mat-form-field>
                  </div>

                  <div class="password-container">
                    <mat-form-field>
                      <mat-label>Enter your password</mat-label>
                      <input matInput placeholder="Password" formControlName="password" [type]="hide ? 'password' : 'text'" required>
                      <a mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                          <span *ngIf="hide; else visibilityon">
                              <i class="fa fa-eye-slash fa-xs" aria-hidden="true"></i>
                          </span>
                          <ng-template #visibilityon>
                              <i class="fa fa-eye fa-xs" aria-hidden="true"></i>
                          </ng-template>
                      </a>
                      <mat-error *ngIf="password.invalid && (password.dirty || password.touched) || password.errors?.['required']"> Password is required. </mat-error>
                    </mat-form-field>
                  </div>
                    
                    <button type="submit" [disabled]="adminForm.invalid" mat-flat-button color="primary">Log in</button>
                
                </form>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
        <video data-test="video-content" preload="auto" src="../../assets/Business%20Analysis.mp4" playsinline="true" loop="loop" draggable="false" autoplay="autoplay"></video>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .matcard {
      background: rgba(255, 255, 255, 0.65);
      /*border: 1px solid rgba(255, 255, 255, 0.2);*/
    }

    .email-container mat-form-field + mat-form-field {
      margin-left: 8px;
    }

    .password-container mat-form-field + mat-form-field {
      margin-left: 8px;
    }

    .video-container {
      position: relative;
      height: 90vh;
      overflow: hidden;
    }
    
    video {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(10px); /* Aggiungi uno sfondo sfuocato */
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
export class LoginAdminComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Admin> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Admin>();

  @Output()
  formSubmitted = new EventEmitter<Admin>();

  adminForm: FormGroup = new FormGroup({});

  hide = true

  constructor(private fb: FormBuilder) { }

  get email() { return this.adminForm.get('email')!; }
  get password() { return this.adminForm.get('password')!; }

  ngOnInit(): void {
    this.initialState.subscribe(admin => {
      this.adminForm = this.fb.group({
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.required, Validators.min(8)])
      });
    });

    this.adminForm.valueChanges.subscribe(val => {
      this.formValuesChanged.emit(val);
    })
  }

  submitForm() {
    this.formSubmitted.emit(this.adminForm.value);
  }
}
