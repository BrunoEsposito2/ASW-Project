import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from "../../employee";

@Component({
  selector: 'app-add-employee',
  template: `
    <app-add-employee-form (formSubmitted)="addEmployee($event)"></app-add-employee-form>
    <app-floating-chat></app-floating-chat>
    <app-footer></app-footer>
  `
})
export class AddEmployeeComponent {
    activeUsername: string | null

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute
  ) {
      this.activeUsername = this.activatedRoute.snapshot.paramMap.get('username');
  }

  addEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/admins/' + this.activeUsername + '/employees']);
        },
        error: (error) => {
          alert("Failed to create employee");
          console.error(error);
        }
      });
  }
}
