import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ChartsComponentComponent } from './charts-component/charts-component.component';
import { PowerUnitChartsComponent } from './power-unit-charts/power-unit-charts.component';
import { NotifierModule} from "angular-notifier";

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    HomepageComponent,
    ChartsComponentComponent,
    PowerUnitChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // <-- add this line
    NotifierModule.withConfig({

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
