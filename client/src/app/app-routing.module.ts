import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component'; // <-- add this line
import {EditEmployeeComponent} from './edit-employee/edit-employee.component'; // <-- add this line
import {AuthAdminComponentComponent} from "./auth-admin-component/auth-admin-component.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthEmployeeComponent} from "./auth-employee/auth-employee.component";
import {HomepageComponent} from "./homepage/homepage.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'employees/edit/:id', component: EditEmployeeComponent }, // <-- add this line
  { path: 'employees/login', component: AuthEmployeeComponent },

  { path: 'admins/login', component: AuthAdminComponentComponent },
  { path: 'admins/dashboard/:username', component: AdminComponent },
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
