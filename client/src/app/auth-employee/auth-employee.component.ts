import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Employee} from "../employee";
import {EmployeeService} from "../employee.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-auth-employee',
  template: `
    <app-login-employee-component [initialState]="employee" (formSubmitted)="employeeAuth($event)"></app-login-employee-component>
  `
})
export class AuthEmployeeComponent implements OnInit {
  employee: BehaviorSubject<Employee> = new BehaviorSubject({});

  constructor(
      private router: Router,
      private employeeService: EmployeeService
  ) { }

  ngOnInit() {}

  employeeAuth(employee: Employee) {
    this.employeeService.getEmployeeByInfo(employee.name !, employee.position !, employee.level !)
        .subscribe({
          next: () => {
            this.router.navigate(['/employees/dashboard/' + employee.name]);
          },
          error: (error: HttpErrorResponse) => {
            alert('Employee could not be found. Please try again.');
            console.log(error);
          }
        })
  }
}
