import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-admin/auth-admin-interceptor'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddEmployeeComponent} from './add-employee/add-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {MixerUnitComponentComponent} from './mixer-unit-component/mixer-unit-component.component';
import {ProductivityComponentComponent} from './productivity-component/productivity-component.component';
import {PowerUnitComponentComponent} from './power-unit-component/power-unit-component.component';
import {IngredientsComponentComponent} from './ingredients-component/ingredients-component.component';
import {AssistantsComponentComponent} from './assistants-component/assistants-component.component';
import {StepsComponentComponent} from './steps-component/steps-component.component';
import {EmployeeRenderedComponent} from './render/employee-rendered.component';
import {ChatComponent} from './chat/chat.component';
import {ChartsComponentComponent} from "./charts-component/charts-component.component";
import {PowerUnitChartsComponent} from "./power-unit-charts/power-unit-charts.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginAdminComponentComponent } from './login-admin-component/login-admin-component.component';
import { LoginEmployeeComponentComponent } from './login-employee-component/login-employee-component.component';
import { AuthAdminComponent } from './auth-admin/auth-admin.component';
import { AdminComponent } from './admin/admin.component';
import { AuthEmployeeComponent } from './auth-employee/auth-employee.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageNavbarComponent } from './homepage-navbar/homepage-navbar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeNavbarComponent } from './employee-navbar/employee-navbar.component';
import { AdminChatComponent } from './admin-chat/admin-chat.component';
import { EmployeeChatComponent } from './employee-chat/employee-chat.component';
import { CommonModule } from '@angular/common';
import { ProductionsListComponent } from './production-list/productions-list.component';
import { AddProductionComponent} from './add-production/add-production-component';
import { ProductionFormComponent } from './production-form/production-form.component';
import { FakerProductionComponent} from './faker-production/faker-production.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        AppComponent,
        EmployeesListComponent,
        EmployeeFormComponent,
        AddEmployeeComponent,
        EditEmployeeComponent,
        MixerUnitComponentComponent,
        ProductivityComponentComponent,
        PowerUnitComponentComponent,
        IngredientsComponentComponent,
        AssistantsComponentComponent,
        StepsComponentComponent,
        EmployeeRenderedComponent,
        ChatComponent,
        ChartsComponentComponent,
        PowerUnitChartsComponent,
        LoginAdminComponentComponent,
        LoginEmployeeComponentComponent,
        AuthAdminComponent,
        AdminComponent,
        AuthEmployeeComponent,
        HomepageComponent,
        DashboardComponent,
        HomepageNavbarComponent,
        AdminNavbarComponent,
        EmployeeComponent,
        EmployeeNavbarComponent,
        AdminChatComponent,
        EmployeeChatComponent,
        ProductionsListComponent,
        AddProductionComponent,
        ProductionFormComponent,
        FakerProductionComponent,
        //ChartsComponentComponent,
        //PowerUnitChartsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatTooltipModule,
    ],
  providers: [
      AuthAdminComponent,
      DashboardComponent,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
