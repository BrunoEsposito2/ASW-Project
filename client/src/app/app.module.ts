import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeesListComponent} from './employees-list/employees-list.component';
import {EmployeeFormComponent} from './employee-form/employee-form.component';
import {HttpClientModule} from '@angular/common/http';
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
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
