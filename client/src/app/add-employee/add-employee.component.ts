import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-add-employee',
  template: `
    <app-admin-navbar></app-admin-navbar>
    <section style="height: 90vh; overflow: hidden;">
        <h2 class="text-center m-5">Add a New Employee</h2>
        <app-employee-form (formSubmitted)="addEmployee($event)"></app-employee-form>
    </section>
  `
})
export class AddEmployeeComponent {
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  addEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          alert("Failed to create employee");
          console.error(error);
        }
      });
  }
}
