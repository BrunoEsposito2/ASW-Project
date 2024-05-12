import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from '../../employee';
import {EmployeeService} from '../../services/employee.service';

@Component({
  selector: 'app-employees-list',
  template: `
    <app-admin-side-nav></app-admin-side-nav>
    <section style="height: 90vh; overflow: hidden;">
      <h2 class="text-center m-4">Employees List</h2>

      <div class="table-responsive" style="height: 410px; overflow-y: scroll;">
        <table class="table align-middle mb-0 bg-white">
          <thead class="bg-light sticky-top">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
          </thead>

          <tbody>
          <tr *ngFor="let employee of employees$ | async">
            <td>
              <div class="d-flex align-items-center">
                <img
                    [src]="employee.img"
                    alt=""
                    style="width: 55px; height: 55px"
                    class="rounded-circle"
                />
                <div class="ms-3">
                  {{employee.name}}
                </div>
              </div>
            </td>
            <td>{{employee.position}}</td>
            <td>{{employee.level}}</td>
            <td>
              <button class="btn btn-primary me-1" [routerLink]="['edit/', employee._id]">Edit</button>
              <button class="btn btn-danger" (click)="deleteEmployee(employee._id || '')">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <button class="btn btn-primary mt-4" [routerLink]="['new']">Add a New Employee</button>
      <app-floating-chat></app-floating-chat>

      <app-footer></app-footer>
    </section>
  `,
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees$: Observable<Employee[]> = new Observable();

  constructor(private employeesService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  deleteEmployee(id: string): void {
    this.employeesService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees()
    });
  }

  private fetchEmployees(): void {
    this.employees$ = this.employeesService.getEmployees();
  }
}
