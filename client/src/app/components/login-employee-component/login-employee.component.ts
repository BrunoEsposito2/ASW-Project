import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Employee} from "../../employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-employee-component',
  template: `
    <div class="video-container">
      <div class="buttons">
        <div class="button-container">
          <div class="row">
            <mat-card class="matcard">
              <mat-card-header class="loginHeader">
                <mat-card-title class="title"> Employee Login </mat-card-title>
              </mat-card-header>
              <mat-card-actions class="cardActions">
                  <form class="employee-form" autocomplete="off" [formGroup]="employeeForm" (ngSubmit)="submitForm()">

                    <div class="name-container">
                      <mat-form-field>
                        <mat-label>Name</mat-label>
                        <input matInput type="text" id="name" formControlName="name" placeholder="Name" required/>
                        <mat-error *ngIf="name.invalid && (name.dirty || name.touched) || name.errors?.['required']"> Name is required. </mat-error>
                      </mat-form-field>
                    </div>
                    
                    <div class="position-container">
                      <mat-form-field>
                        <mat-label>Position</mat-label>
                        <input matInput placeholder="Position" formControlName="position" required>
                        <mat-error *ngIf="position.invalid && (position.dirty || position.touched) || position.errors?.['required']"> Position is required. </mat-error>
                      </mat-form-field>
                    </div>
                    
                    <div class="password-container">
                      <mat-form-field>
                        <mat-label>Password</mat-label>
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

                    <button type="submit" [disabled]="employeeForm.invalid" mat-flat-button color="primary">Log in</button>

                  </form>
              </mat-card-actions>
            </mat-card>
          </div>
        </div>
        <video class="video-container" data-test="video-content" preload="auto" src="../../assets/Business%20Analysis.mp4" playsinline="true" loop="loop" draggable="false" autoplay="autoplay"></video><video class="video-container" data-test="video-content" preload="auto" src="../../assets/Business%20Analysis.mp4" playsinline="true" loop="loop" draggable="false" autoplay="autoplay"></video>
      </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .matcard {
      background: rgba(255, 255, 255, 0.65);
      /*border: 1px solid rgba(255, 255, 255, 0.2);*/
    }

    .name-container position-container mat-form-field + mat-form-field {
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
    
    .video-container video {
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
export class LoginEmployeeComponent implements OnInit {
  @Input()
  initialState: BehaviorSubject<Employee> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Employee>();

  @Output()
  formSubmitted = new EventEmitter<Employee>();

  employeeForm: FormGroup = new FormGroup({});

  hide = true

  constructor(private fb: FormBuilder) { }

  get name() { return this.employeeForm.get('name')!; }
  get position() { return this.employeeForm.get('position')!; }
  get password() { return this.employeeForm.get('password')!; }

  ngOnInit() {
    this.initialState.subscribe(employee => {
      this.employeeForm = this.fb.group({
        name: [ employee.name, [Validators.required] ],
        position: [ employee.position, [ Validators.required ] ],
        password: [ employee.password, [ Validators.required ] ]
      });
    });

    this.employeeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.employeeForm.value);
  }
}
