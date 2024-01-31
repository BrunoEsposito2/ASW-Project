import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Employee} from "../employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-employee-component',
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
                  <h2 class="text-uppercase text-center mb-5">Employee Login</h2>

                  <form class="admin-form" autocomplete="off" [formGroup]="employeeForm" (ngSubmit)="submitForm()">

                    <div class="form-floating mb-4">
                      <input type="text" id="name" formControlName="name" placeholder="Name"
                             class="form-control form-control-lg" required/>
                      <label class="form-label" for="name">Name</label>
                    </div>

                    <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger" role="alert">
                      <div *ngIf="name.errors?.['required']">
                        Name is required.
                      </div>
                    </div>

                    <div class="form-floating mb-4">
                      <input type="text" id="position" formControlName="position" placeholder="Position"
                             class="form-control form-control-lg" required/>
                      <label class="form-label" for="position">Position</label>
                    </div>

                    <div *ngIf="position.invalid && (position.dirty || position.touched)" class="alert alert-danger" role="alert">
                      <div *ngIf="position.errors?.['required']">
                        Position is required.
                      </div>
                    </div>

                    <div class="form-floating mb-4">
                      <input type="text" id="password" formControlName="password" placeholder="Password"
                             class="form-control form-control-lg" required/>
                      <label class="form-label" for="password">Password</label>
                    </div>

                    <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger" role="alert">
                      <div *ngIf="password.errors?.['required']">
                        Password is required.
                      </div>
                    </div>
                    
                    <div class="d-flex justify-content-center">
                      <button type="submit" [disabled]="employeeForm.invalid"
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
  styleUrls: ['./login-employee.component.css']
})
export class LoginEmployeeComponent {
  @Input()
  initialState: BehaviorSubject<Employee> = new BehaviorSubject({});

  @Output()
  formValuesChanged = new EventEmitter<Employee>();

  @Output()
  formSubmitted = new EventEmitter<Employee>();

  employeeForm: FormGroup = new FormGroup({});

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
