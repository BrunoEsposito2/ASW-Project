import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component'; // <-- add this line
import {EditEmployeeComponent} from './edit-employee/edit-employee.component'; // <-- add this line
import {DashboardComponent} from './dashboard/dashboard.component'
import {LoginAdminComponentComponent} from "./login-admin-component/login-admin-component.component";
import {AuthAdminComponentComponent} from "./auth-admin-component/auth-admin-component.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {LoginEmployeeComponentComponent} from "./login-employee-component/login-employee-component.component";
import {AuthEmployeeComponent} from "./auth-employee/auth-employee.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'employees/edit/:id', component: EditEmployeeComponent }, // <-- add this line
  { path: 'employees/login', component: AuthEmployeeComponent },

  { path: 'admins/login', component: AuthAdminComponentComponent },
  { path: 'admins/dashboard', component: AdminDashboardComponent },
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes),
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
