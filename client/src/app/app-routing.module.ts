import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesListComponent} from './components/employees-list/employees-list.component';
import {AddEmployeeComponent} from './components/add-employee/add-employee.component';
import {AddProductionComponent} from "./components/add-production/add-production-component";
import {EditEmployeeComponent} from './components/edit-employee/edit-employee.component';
import {AuthAdminComponent} from "./components/auth-admin/auth-admin.component";
import {AdminComponent} from "./components/admin/admin.component";
import {AuthEmployeeComponent} from "./components/auth-employee/auth-employee.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {AdminChatComponent} from "./components/admin-chat/admin-chat.component";
import {EmployeeChatComponent} from "./components/employee-chat/employee-chat.component";
import {ProductionsListComponent} from './components/production-list/productions-list.component';
import {canActivateGuard} from "./services/auth-guard";
import {TemplateComponent} from "./components/pro-version/template/template.component";

const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'FraBruGia - Cookies, Accept Them' },

  { path: 'dashboard-pro', component: TemplateComponent },

  { path: 'employees', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees/login', component: AuthEmployeeComponent, title: 'FraBruGia - Employee Login' },
  { path: 'employees/dashboard/:username', component: EmployeeComponent, title: 'FraBruGia - Employee Dashboard', canActivate: [canActivateGuard] },
  { path: 'employees/chat/:username', component: EmployeeChatComponent, title: 'FraBruGia - Employee Chat', canActivate: [canActivateGuard] },
  { path: 'productions', component: ProductionsListComponent, canActivate: [canActivateGuard] },
  { path: 'admins/productions', component: AuthAdminComponent, canActivate: [canActivateGuard] },
  { path: 'productions/new-production', component: AddProductionComponent, canActivate: [canActivateGuard] },
  { path: 'admins/:username/productions', component: ProductionsListComponent, canActivate: [canActivateGuard] },

  { path: 'admins/login', component: AuthAdminComponent, title: 'FraBruGia - Admin Login' },
  { path: 'admins/dashboard/:username', component: AdminComponent, title: 'FraBruGia - Admin Dashboard', canActivate: [canActivateGuard] },
  { path: 'admins/chat/:username', component: AdminChatComponent, title: 'FraBruGia - Admin Chat', canActivate: [canActivateGuard] },
  { path: 'admins/:username/employees', component: EmployeesListComponent, title: 'FraBruGia - Employees List', canActivate: [canActivateGuard] },
  { path: 'admins/:username/employees/new', component: AddEmployeeComponent, title: 'FraBruGia - Add New Employee', canActivate: [canActivateGuard] },
  { path: 'admins/:username/employees/edit/:id', component: EditEmployeeComponent, title: 'FraBruGia - Edit Employee', canActivate: [canActivateGuard] },
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
