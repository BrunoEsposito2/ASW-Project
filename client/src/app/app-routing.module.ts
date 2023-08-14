import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component'; // <-- add this line
import {EditEmployeeComponent} from './edit-employee/edit-employee.component'; // <-- add this line
import {AuthAdminComponent} from "./auth-admin/auth-admin.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthEmployeeComponent} from "./auth-employee/auth-employee.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {ChatComponent} from "./chat/chat.component";
import {EmployeeComponent} from "./employee/employee.component";
import {AdminChatComponent} from "./admin-chat/admin-chat.component";
import {EmployeeChatComponent} from "./employee-chat/employee-chat.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent },
  { path: 'employees/new', component: AddEmployeeComponent }, // <-- add this line
  { path: 'employees/edit/:id', component: EditEmployeeComponent }, // <-- add this line
  { path: 'employees/login', component: AuthEmployeeComponent },
  { path: 'employees/dashboard/:username', component: EmployeeComponent },
  { path: 'employees/chat/:username', component: EmployeeChatComponent },

  { path: 'admins/login', component: AuthAdminComponent },
  { path: 'admins/dashboard/:username', component: AdminComponent },
  { path: 'admins/chat/:username', component: AdminChatComponent },
  { path: 'admins/:username/employees', component: EmployeesListComponent }
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
