import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Employee} from "../employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-employee-component',
  template: `
    <section class="vh-100 gradient-custom" xmlns="http://www.w3.org/1999/html">
      <form class="admin-form" autocomplete="off" [formGroup]="employeeForm" (ngSubmit)="submitForm()">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">

                  <div class="mb-md-5 mt-md-4 pb-5">

                    <h2 class="fw-bold mb-2 text-uppercase">Login Employee</h2>
                    <p class="text-white-50 mb-5">Please enter your credentials!</p>

                    <div class="form-outline form-white mb-4">
                      <input placeholder="Name" type="text" id="name" formControlName="name"
                             class="form-control form-control-lg" required/>
                    </div>

                    <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
                      <div *ngIf="name.errors?.['required']">
                        Name is required.
                      </div>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input placeholder="Position" type="text" id="position" formControlName="position"
                             class="form-control form-control-lg" required/>
                    </div>

                    <div *ngIf="position.invalid && (position.dirty || position.touched)" class="alert alert-danger">
                      <div *ngIf="position.errors?.['required']">
                        Position is required.
                      </div>
                    </div>

                    <div class="mb-3">
                      <div class="form-check">
                        <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-junior" value="junior" required>
                        <label class="form-check-label" style="float: left;" for="level-junior">Junior</label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-mid" value="mid" required>
                        <label class="form-check-label" style="float: left;" for="level-mid">Mid</label>
                      </div>
                      <div class="form-check">
                        <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-senior"
                               value="senior" required>
                        <label class="form-check-label" style="float: left;" for="level-senior">Senior</label>
                      </div>
                    </div>

                    <button class="btn btn-outline-light btn-lg px-5" type="submit" [disabled]="employeeForm.invalid">
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
  styleUrls: ['./login-employee-component.component.css']
})
export class LoginEmployeeComponentComponent {
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

  ngOnInit() {
    this.initialState.subscribe(employee => {
      this.employeeForm = this.fb.group({
        name: [ employee.name, [Validators.required] ],
        position: [ employee.position, [ Validators.required ] ],
        level: [ employee.level, [Validators.required] ]
      });
    });

    this.employeeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
  }

  submitForm() {
    this.formSubmitted.emit(this.employeeForm.value);
  }
}
