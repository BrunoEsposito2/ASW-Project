import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdminService} from "../admin.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Admin} from "../admin"

@Component({
  selector: 'app-login-admin-component',
  template: `
    <section class="vh-100 gradient-custom" xmlns="http://www.w3.org/1999/html">
      <form class="admin-form" autocomplete="off" [formGroup]="adminForm" (ngSubmit)="submitForm()">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">

                  <div class="mb-md-5 mt-md-4 pb-5">

                    <h2 class="fw-bold mb-2 text-uppercase">Login Admin</h2>
                    <p class="text-white-50 mb-5">Please enter your login and password!</p>

                    <div class="form-outline form-white mb-4">
                      <input placeholder="Email" type="text" id="email" formControlName="email"
                             class="form-control form-control-lg" required/>
                    </div>

                    <div *ngIf="email.invalid && (email.dirty || email.touched)" class="alert alert-danger">
                      <div *ngIf="email.errors?.['required']">
                        Email is required.
                      </div>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input placeholder="Password" type="text" id="password" formControlName="password"
                             class="form-control form-control-lg" required/>
                    </div>

                    <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">
                      <div *ngIf="password.errors?.['required']">
                        Password is required.
                      </div>
                    </div>

                    <button class="btn btn-outline-light btn-lg px-5" type="submit" [disabled]="adminForm.invalid">
                      Login
                    </button>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  `,
  styleUrls: ['./login-admin-component.component.css']
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
