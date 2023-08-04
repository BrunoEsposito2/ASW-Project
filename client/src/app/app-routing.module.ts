import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component'; // <-- add this line
import {EditEmployeeComponent} from './edit-employee/edit-employee.component'; // <-- add this line
import {HomepageComponent} from './homepage/homepage.component'
import {LoginAdminComponentComponent} from "./login-admin-component/login-admin-component.component";
import {AuthAdminComponentComponent} from "./auth-admin-component/auth-admin-component.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'employees/edit/:id', component: EditEmployeeComponent }, // <-- add this line

  { path: 'admins/login', component: AuthAdminComponentComponent },
  //{ path: 'admins/:id', component: LoginAdminComponentComponent }
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
