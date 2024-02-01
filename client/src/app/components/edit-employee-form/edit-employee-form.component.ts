import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Employee} from '../../employee';

@Component({
    selector: 'edit-employee-form',
    template: `
    <form class="employee-form" autocomplete="off" [formGroup]="employeeForm" (ngSubmit)="submitForm()">
      <div class="form-floating mb-3">
        <input class="form-control" type="text" id="name" formControlName="name" placeholder="Name" required>
        <label for="name">Name</label>
      </div>

      <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
        <div *ngIf="name.errors?.['required']">
          Name is required.
        </div>
        <div *ngIf="name.errors?.['minlength']">
          Name must be at least 3 characters long.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="position" placeholder="Position" required>
        <label for="position">Position</label>
      </div>

      <div *ngIf="position.invalid && (position.dirty || position.touched)" class="alert alert-danger">

        <div *ngIf="position.errors?.['required']">
          Position is required.
        </div>
        <div *ngIf="position.errors?.['minlength']">
          Position must be at least 5 characters long.
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="img" placeholder="Img" required>
        <label for="img">Image</label>
      </div>

      <div *ngIf="img.invalid && (img.dirty || img.touched)" class="alert alert-danger">

        <div *ngIf="img.errors?.['required']">
          Image is required.
        </div>
        <div *ngIf="img.errors?.['minlength']">
          Image must be at least 5 characters long.
        </div>
      </div>

      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-junior" value="junior" required>
          <label class="form-check-label" for="level-junior">Junior</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-mid" value="mid">
          <label class="form-check-label" for="level-mid">Mid</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" formControlName="level" name="level" id="level-senior"
            value="senior">
          <label class="form-check-label" for="level-senior">Senior</label>
        </div>
      </div>

      <div class="form-floating mb-3">
        <input class="form-control" type="text" formControlName="password" placeholder="Password" required>
        <label for="password">Password</label>
      </div>

      <div *ngIf="password.invalid && (password.dirty || password.touched)" class="alert alert-danger">

        <div *ngIf="password.errors?.['required']">
          Password is required.
        </div>
        <div *ngIf="password.errors?.['minlength']">
          Password must be at least 8 characters long.
        </div>
      </div>

      <button class="btn btn-primary" type="submit" [disabled]="employeeForm.invalid">Edit</button>
    </form>
    
    <app-floating-chat></app-floating-chat>
    <app-footer></app-footer>
  `,
    styles: [
        `.employee-form {
      max-width: 560px;
      margin-left: auto;
      margin-right: auto;
    }`
    ]
})
export class EditEmployeeFormComponent implements OnInit {
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
    get level() { return this.employeeForm.get('level')!; }
    get img() { return this.employeeForm.get('img')!; }
    get password() { return this.employeeForm.get('password')!; }


    ngOnInit() {
        this.initialState.subscribe(employee => {
            this.employeeForm = this.fb.group({
                name: [ employee.name, [Validators.required, Validators.minLength(3)] ],
                position: [ employee.position, [ Validators.required, Validators.minLength(5) ] ],
                level: [ employee.level, [Validators.required] ],
                img: [ employee.img, [ Validators.required, Validators.minLength(5) ] ],
                password: [ employee.password, [ Validators.required, Validators.minLength(8)]]
            });
        });

        this.employeeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
    }

    submitForm() {
        this.formSubmitted.emit(this.employeeForm.value);
    }
}
