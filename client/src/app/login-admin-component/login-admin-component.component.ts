import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Admin} from "../admin"

@Component({
  selector: 'app-login-admin-component',
  template: `
    <section class="vh-100 bg-image"
             style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
              <div class="card" style="border-radius: 15px;">
                <div class="card-body p-5">
                  <h2 class="text-uppercase text-center mb-5">Admin Login</h2>
                  
                  <form class="admin-form" autocomplete="off" [formGroup]="adminForm" (ngSubmit)="submitForm()">

                    <div class="form-outline mb-4">
                      <input type="email" id="email" formControlName="email"
                             class="form-control form-control-lg" required/>
                      <label class="form-label" for="email">Email</label>
                    </div>

                    <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger" role="alert">
                      <div *ngIf="email.errors?.['required']">
                        Email is required.
                      </div>
                    </div>

                    <div class="form-outline mb-4">
                      <input type="password" id="password" formControlName="password" 
                             class="form-control form-control-lg" required/>
                      <label class="form-label" for="password">Password</label>
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
  `,
  styleUrls: [

  ]
})
export class LoginAdminComponentComponent implements OnInit {
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
