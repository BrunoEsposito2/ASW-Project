import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component'; // <-- add this line
import {EditEmployeeComponent} from './edit-employee/edit-employee.component'; // <-- add this line
import {HomepageComponent} from './homepage/homepage.component'
/*import {LoginComponent} from "./login/login.component";
import {AdminFormComponent} from "./authentication/admin-form/admin-form.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {AddAdminComponent} from "./add-admin/add-admin.component";
import {EditAdminComponent} from "./edit-admin/edit-admin.component";*/

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'employees/edit/:id', component: EditEmployeeComponent }, // <-- add this line
  /*{ path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminFormComponent },
    { path: 'admins', redirectTo: 'admins', pathMatch: 'full' },
    { path: 'admins/new', component: AddAdminComponent },
    { path: 'admins/edit/:id', component: EditAdminComponent }*/

];

@NgModule({
  imports: [
      RouterModule.forRoot(routes),
      /*MatInputModule,
      MatSelectModule*/
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
