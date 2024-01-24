import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Employee} from "../employee";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-employee-component',
  template: `
    <app-homepage-navbar></app-homepage-navbar>
    <section class="vh-100 bg-image"
             style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
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

                    <div class="mb-4">
                      <div class="form-check d-flex align-items-center mb-3">
                        <input class="form-check-input me-2" type="radio" formControlName="level" name="level" id="level-junior" value="junior" required>
                        <label class="form-check-label" for="level-junior">Junior</label>
                      </div>
                      <div class="form-check d-flex align-content-between mb-3">
                        <input class="form-check-input me-2" type="radio" formControlName="level" name="level" id="level-mid" value="mid" required>
                        <label class="form-check-label" for="level-mid">Mid</label>
                      </div>
                      <div class="form-check d-flex align-content-center mb-3">
                        <input class="form-check-input me-2" type="radio" formControlName="level" name="level" id="level-senior" value="senior" required>
                        <label class="form-check-label" for="level-senior">Senior</label>
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
