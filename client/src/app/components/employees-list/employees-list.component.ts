import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from '../../employee';
import {EmployeeService} from '../../services/employee.service';

interface SideNavToggle {
  screenWidth: number
  collapsed: boolean
}

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  @Input() collapsed = false
  @Input() screenWidth = 0

  employees$: Observable<Employee[]> = new Observable();
  displayedColumns: string[] = ['name', 'position', 'level', 'action'];

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

  getBodyClass() {
    let styleClass = ''
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass
  }

  onToggleSidenav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth
    this.collapsed = data.collapsed
  }
}
