import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {AddProductionComponent} from "./add-production/add-production-component";
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {AuthAdminComponent} from "./auth-admin/auth-admin.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthEmployeeComponent} from "./auth-employee/auth-employee.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {ChatComponent} from "./chat/chat.component";
import {EmployeeComponent} from "./employee/employee.component";
import {AdminChatComponent} from "./admin-chat/admin-chat.component";
import {EmployeeChatComponent} from "./employee-chat/employee-chat.component";
import {ProductionsListComponent} from './production-list/productions-list.component';
import {canActivateGuard} from "./auth-session-guard/auth-guard";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeesListComponent, canActivate: [canActivateGuard] },
  { path: 'employees/new', component: AddEmployeeComponent, canActivate: [canActivateGuard] },
  { path: 'employees/edit/:id', component: EditEmployeeComponent, canActivate: [canActivateGuard] },
  { path: 'employees/login', component: AuthEmployeeComponent },
  { path: 'employees/dashboard/:username', component: EmployeeComponent, canActivate: [canActivateGuard] },
  { path: 'employees/chat/:username', component: EmployeeChatComponent, canActivate: [canActivateGuard] },
  { path: 'productions', component: ProductionsListComponent, canActivate: [canActivateGuard] },
  { path: 'admins/productions', component: AuthAdminComponent, canActivate: [canActivateGuard] },
  { path: 'productions/new-production', component: AddProductionComponent, canActivate: [canActivateGuard] },
  { path: 'admins/:username/productions', component: ProductionsListComponent, canActivate: [canActivateGuard] },

  { path: 'admins/login', component: AuthAdminComponent },
  { path: 'admins/dashboard/:username', component: AdminComponent, canActivate: [canActivateGuard] },
  { path: 'admins/chat/:username', component: AdminChatComponent, canActivate: [canActivateGuard] },
  { path: 'admins/:username/employees', component: EmployeesListComponent, canActivate: [canActivateGuard] },
  { path: 'admins/:username/employees/new', component: AddEmployeeComponent, canActivate: [canActivateGuard] },
  { path: 'admins/:username/employees/edit/:id', component: EditEmployeeComponent, canActivate: [canActivateGuard] },
  { path: 'employee-operating-data', redirectTo: 'employee-operating-data', pathMatch: 'full' },
  { path: 'cycle-production', redirectTo: 'cycle-production', pathMatch: 'full'},
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
