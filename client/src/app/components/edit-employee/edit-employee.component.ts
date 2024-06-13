import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Employee} from '../../employee';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee.component.ts',
  template: `
    <edit-employee-form [initialState]="employee" (formSubmitted)="editEmployee($event)"></edit-employee-form>
    <app-floating-chat></app-floating-chat>
    <app-footer></app-footer>
  `
})
export class EditEmployeeComponent implements OnInit {
  employee: BehaviorSubject<Employee> = new BehaviorSubject({});
  activeUsername: String | null

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {
    this.activeUsername = this.route.snapshot.paramMap.get('username');
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    }

    this.employeeService.getEmployee(id !).subscribe((employee) => {
      employee.password = ''
      this.employee.next(employee);
    });
  }

  editEmployee(employee: Employee) {
    this.employeeService.updateEmployee(this.employee.value._id || '', employee)
      .subscribe({
        next: () => {
          this.router.navigate(['/admins/' + this.activeUsername + '/employees']);
        },
        error: (error) => {
          alert('Failed to update employee');
          console.error(error);
        }
      })
  }
}
