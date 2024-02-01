import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Employee} from '../../employee';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee.component.ts',
  template: `
    <app-admin-navbar></app-admin-navbar>
    <section style="height: 90vh; overflow: hidden;">
      <h2 class="text-center m-5">Edit Employee Data</h2>
      <edit-employee-form [initialState]="employee" (formSubmitted)="editEmployee($event)"></edit-employee-form>
    </section>
  `
})
export class EditEmployeeComponent implements OnInit {
  employee: BehaviorSubject<Employee> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) { }

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
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          alert('Failed to update employee');
          console.error(error);
        }
      })
  }
}
