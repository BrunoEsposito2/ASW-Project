import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Admin} from "../../admin"

@Component({
  selector: 'app-login-admin-component',
  template: `
    <app-homepage-navbar></app-homepage-navbar>
    <section class="vh-90 bg-image"
             style="height: 90vh; overflow: hidden;">
      <video class="video-container" data-test="video-content" preload="auto" src="../../assets/Business%20Analysis.mp4" playsinline="true" loop="loop" draggable="false" autoplay="autoplay"></video><video class="video-container" data-test="video-content" preload="auto" src="../../assets/Business%20Analysis.mp4" playsinline="true" loop="loop" draggable="false" autoplay="autoplay"></video>
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px;">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Admin Login</h2>
                  
                  <form class="admin-form" autocomplete="off" [formGroup]="adminForm" (ngSubmit)="submitForm()">

                    <div class="form-floating mb-4">
                      <input type="email" id="email" formControlName="email"  placeholder="Email"
                             class="form-control form-control-lg" required/>
                      <label for="email">Email</label>
                    </div>

                    <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger" role="alert">
                      <div *ngIf="email.errors?.['required']">
                        Email is required.
                      </div>
                    </div>

                    <div class="form-floating mb-4">
                      <input type="password" id="password" formControlName="password" placeholder="Password"
                             class="form-control form-control-lg" required/>
                      <label for="password">Password</label>
                    </div>

                    <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger" role="alert">
                      <div *ngIf="password.errors?.['required']">
                        Password is required.
                      </div>
                    </div>

                    <div class="d-flex justify-content-center">
                      <button type="submit" [disabled]="adminForm.invalid"
                              class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Log in</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .video-container {
      position: absolute;
      top: -30%;
      left: -30%;
      width: 140%;
      height: 140%;
      object-fit: cover;
      filter: blur(10px); /* Aggiungi uno sfondo sfuocato */
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

  constructor(private fb: FormBuilder) { }

  get email() { return this.adminForm.get('email')!; }
  get password() { return this.adminForm.get('password')!; }

  ngOnInit(): void {
    this.initialState.subscribe(admin => {
      this.adminForm = this.fb.group({
        email: [admin.email, [Validators.required] ],
        password: [admin.password, [Validators.required] ]
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
