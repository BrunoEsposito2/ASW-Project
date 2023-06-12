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
import {HomepageComponent} from './homepage/homepage.component';
import {MixerUnitComponentComponent} from './mixer-unit-component/mixer-unit-component.component';
import {ProductivityComponentComponent} from './productivity-component/productivity-component.component';
import {PowerUnitComponentComponent} from './power-unit-component/power-unit-component.component';
import {IngredientsComponentComponent} from './ingredients-component/ingredients-component.component';
import {AssistantsComponentComponent} from './assistants-component/assistants-component.component';
import {StepsComponentComponent} from './steps-component/steps-component.component';
import {EmployeeRenderedComponent} from './render/employee-rendered.component';
import {ChatComponent} from './chat/chat.component';
import {UsernameComponent} from './username/username.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    EmployeeFormComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    HomepageComponent,
    MixerUnitComponentComponent,
    ProductivityComponentComponent,
    PowerUnitComponentComponent,
    IngredientsComponentComponent,
    AssistantsComponentComponent,
    StepsComponentComponent,
    EmployeeRenderedComponent,
    ChatComponent,
    UsernameComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        // <-- add this line
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
