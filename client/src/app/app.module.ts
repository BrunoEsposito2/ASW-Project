import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeesListComponent} from './components/employees-list/employees-list.component';
import {AddEmployeeFormComponent} from './components/employee-form/add-employee-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddEmployeeComponent} from './components/add-employee/add-employee.component';
import {EditEmployeeComponent} from './components/edit-employee/edit-employee.component';
import {MixerUnitComponentComponent} from './components/mixer-unit-component/mixer-unit-component.component';
import {ProductivityComponentComponent} from './components/productivity-component/productivity-component.component';
import {PowerUnitComponentComponent} from './components/power-unit-component/power-unit-component.component';
import {IngredientsComponentComponent} from './components/ingredients-component/ingredients-component.component';
import {AssistantsComponentComponent} from './components/assistants-component/assistants-component.component';
import {StepsComponentComponent} from './components/steps-component/steps-component.component';
import {EmployeeRenderedComponent} from './components/render/employee-rendered.component';
import {ChatComponent} from './components/chat/chat.component';
import {ChartsComponentComponent} from "./components/charts-component/charts-component.component";
import {PowerUnitChartsComponent} from "./components/power-unit-charts/power-unit-charts.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginAdminComponent } from './components/login-admin-component/login-admin.component';
import { LoginEmployeeComponent } from './components/login-employee-component/login-employee.component';
import { AuthAdminComponent } from './components/auth-admin/auth-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthEmployeeComponent } from './components/auth-employee/auth-employee.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageNavbarComponent } from './components/homepage-navbar/homepage-navbar.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeNavbarComponent } from './components/employee-navbar/employee-navbar.component';
import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { EmployeeChatComponent } from './components/employee-chat/employee-chat.component';
import { ProductionsListComponent } from './components/production-list/productions-list.component';
import { AddProductionComponent} from './components/add-production/add-production-component';
import { ProductionFormComponent } from './components/production-form/production-form.component';
import { FakerProductionComponent} from './components/faker-production/faker-production.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import { FloatingChatComponent } from './components/floating-chat/floating-chat.component';
import {MdbTabsModule} from "mdb-angular-ui-kit/tabs";
import { FooterComponent } from './components/footer/footer.component';
import {EditEmployeeFormComponent} from "./components/edit-employee-form/edit-employee-form.component";

@NgModule({
    declarations: [
        AppComponent,
        EmployeesListComponent,
        AddEmployeeFormComponent,
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
        LoginAdminComponent,
        LoginEmployeeComponent,
        AuthAdminComponent,
        AdminComponent,
        AuthEmployeeComponent,
        HomepageComponent,
        DashboardComponent,
        HomepageNavbarComponent,
        AdminNavbarComponent,
        EmployeeComponent,
        EditEmployeeFormComponent,
        EmployeeNavbarComponent,
        AdminChatComponent,
        EmployeeChatComponent,
        ProductionsListComponent,
        AddProductionComponent,
        ProductionFormComponent,
        FakerProductionComponent,
        StepsComponentComponent,
        FloatingChatComponent,
        FooterComponent,
        //ChartsComponentComponent,
        //PowerUnitChartsComponent
    ],
    imports: [
        /* Mdb frontend components */
        MdbCollapseModule,
        MdbDropdownModule,
        MdbRippleModule,
        MdbTabsModule,

        /* Material frontend components */
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressBarModule,

        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
    ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
