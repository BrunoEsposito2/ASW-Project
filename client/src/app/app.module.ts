import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeesListComponent} from './components/employees-list/employees-list.component';
import {AddEmployeeFormComponent} from './components/add-employee-form/add-employee-form.component';
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
import {ChatComponent} from "./components/chat/chat.component";
import {ChartsComponentComponent} from "./components/charts-component/charts-component.component";
import {PowerUnitChartsComponent} from "./components/power-unit-charts/power-unit-charts.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule, MatIconButton} from "@angular/material/button";
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginAdminComponent } from './components/login-admin-component/login-admin.component';
import { LoginEmployeeComponent } from './components/login-employee-component/login-employee.component';
import { AuthAdminComponent } from './components/auth-admin/auth-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthEmployeeComponent } from './components/auth-employee/auth-employee.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageNavbarComponent } from './components/homepage-navbar/homepage-navbar.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { EmployeeChatComponent } from './components/employee-chat/employee-chat.component';
import { ProductionsListComponent } from './components/production-list/productions-list.component';
import { AddProductionComponent} from './components/add-production/add-production-component';
import { ProductionFormComponent } from './components/production-form/production-form.component';
import { FakerProductionComponent} from './components/faker-production/faker-production.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { FloatingChatComponent } from './components/floating-chat/floating-chat.component';
import { FooterComponent } from './components/footer/footer.component';
import {EditEmployeeFormComponent} from "./components/edit-employee-form/edit-employee-form.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ChartModule} from "angular-highcharts";
import {LastFewTransactionsComponent} from "./components/pro-version/last-few-transactions/last-few-transactions.component";
import {SideNavComponent} from "./components/side-nav/side-nav.component";
import {DashboardProComponent} from "./components/pro-version/dashboard-pro/dashboard-pro.component";
import {TemplateComponent} from "./components/pro-version/template/template.component";
import {MatListModule} from "@angular/material/list";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AdminSideNavComponent} from "./components/admin-side-nav/admin-side-nav.component";
import {EmployeeSideNavComponent} from "./components/employee-side-nav/employee-side-nav.component";
import {TopWidgetsComponent} from "./components/pro-version/top-widgets/top-widgets.component";
import {SalesByMonthComponent} from "./components/pro-version/sales-by-month/sales-by-month.component";
import {SalesByCategoryComponent} from "./components/pro-version/sales-by-category/sales-by-category.component";
import {TopThreeProductsComponent} from "./components/pro-version/top-three-products/top-three-products.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";

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
        EmployeeComponent,
        EditEmployeeFormComponent,
        AdminChatComponent,
        EmployeeChatComponent,
        ProductionsListComponent,
        AddProductionComponent,
        ProductionFormComponent,
        FakerProductionComponent,
        StepsComponentComponent,
        FloatingChatComponent,
        FooterComponent,

        LastFewTransactionsComponent,
        SideNavComponent,
        DashboardProComponent,
        TemplateComponent,

        AdminSideNavComponent,
        EmployeeSideNavComponent,
        TopWidgetsComponent,
        SalesByMonthComponent,
        SalesByCategoryComponent,
        TopThreeProductsComponent
        //ChartsComponentComponent,
        //PowerUnitChartsComponent
    ],
    imports: [
        /* Mdb frontend components */

        /* Material frontend components */
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatIconModule,
        FlexLayoutModule,
        MatCardModule,
        MatFormFieldModule,

        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        FontAwesomeModule,
        ChartModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatTabsModule,
        MatTableModule,
        MatRadioModule
    ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
